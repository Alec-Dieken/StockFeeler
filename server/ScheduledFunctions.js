const axios = require("axios");
const stockQuery = require("./utils/StockQuery");
const Asset = require("./models/Asset");
const Votes = require("./models/Votes");
const User = require("./models/User");
const Queries = require("./models/Queries");
require("dotenv").config();

class ScheduledFunctions {
    constructor() {}

    /********************************************************
     * BATCHCREATE - RESPONSIBLE FOR CREATING DAILY QUERIES *
     ********************************************************/
    async batchCreateQueries(size) {
        const newQueries = stockQuery.generateDailyQueriesObj(size);

        // iterate through the newQueries object and use the data to create new Queries
        for (let ticker in newQueries) {
            for (let duration of newQueries[ticker]) {
                try {
                    duration = +duration;
                    const currentDateObj = new Date();
                    const queryStartDateString = stockQuery.generateDateString(currentDateObj, 365);
                    const queryEndDateString = stockQuery.generateDateString(currentDateObj);

                    /***********************************
                     *********CHART DATA API CALL********
                     ***********************************/
                    console.log("Getting chart data for: " + ticker);
                    const chartDataApiURL = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${queryStartDateString}/${queryEndDateString}?adjusted=true&sort=asc&apiKey=${process.env.POLYGON_API_KEY}`;
                    const polygonQuery = await axios.get(chartDataApiURL);

                    const chartData = polygonQuery.data.results;

                    const lastClosingPrice = chartData[chartData.length - 1].c;

                    // *** Calculate Average Daily Percentage Change during past year ***
                    let totalPercentageChange = 0;
                    const numOfDays = chartData.length;

                    chartData.forEach((day) => {
                        const dailyChange = Math.abs(((day.c - day.o) / day.o) * 100);
                        totalPercentageChange += dailyChange;
                    });

                    const avgChange = Math.floor((totalPercentageChange / numOfDays) * 100) / 100;
                    // *****************************************************************

                    await Queries.create(ticker, duration, chartData, lastClosingPrice, avgChange);

                    /***********************************
                     *********NEWS DATA API CALL*********
                     ***********************************/
                    console.log("Getting News for: " + ticker);
                    const newsQueryApiURL = `https://api.polygon.io/v2/reference/news?ticker=${ticker}&order=desc&limit=3&sort=published_utc&apiKey=${process.env.POLYGON_API_KEY}`;
                    const newsPolygonResponse = await axios.get(newsQueryApiURL);

                    const newsData = newsPolygonResponse.data.results;

                    const news = newsData.map((item) => {
                        return {
                            title: item.title,
                            description: item.description,
                            author: item.author,
                            publishDate: item.published_utc,
                            articleUrl: item.article_url,
                            imageUrl: item.image_url,
                        };
                    });

                    /***********************************
                     ********ASSET DATA API CALL*********
                     ***********************************/
                    const asset = await Asset.findOne({ ticker });

                    if (!asset) {
                        console.log("Creating Asset for: " + ticker);
                        const assetQueryApiURL = `https://api.polygon.io/v3/reference/tickers/${ticker}?apiKey=${process.env.POLYGON_API_KEY}`;
                        const assetPolygonResponse = await axios.get(assetQueryApiURL);

                        const assetData = assetPolygonResponse.data.results;

                        const name = assetData.name;
                        const description = assetData.description;
                        const website = assetData.homepage_url;
                        const type = assetData.sic_description;

                        await Asset.create(ticker, name, description, website, type, news);
                    } else {
                        asset.news = news;
                        await asset.save();
                    }
                } catch (err) {
                    console.log(err);
                }
            }
        }
    }

    async deactivateQueries(all = true, ignoreMarketStatus = false) {
        try {
            const marketStatusRequest = await axios.get(`https://api.polygon.io/v1/marketstatus/now?apiKey=${process.env.POLYGON_API_KEY}`);
            const marketStatus = marketStatusRequest.data.market;

            if (marketStatus !== "closed" || ignoreMarketStatus) {
                try {
                    let queries;
                    queries = all ? await Queries.find({ isActive: true }) : await Queries.find({ duration: 1 });

                    const savePromises = queries.map(async (query) => {
                        query.isActive = false;
                        await query.save();
                    });

                    await Promise.all(savePromises);
                } catch (err) {
                    console.log(err);
                }
            }

            return marketStatus;
        } catch (err) {
            console.log(err);
        }
    }

    async updateDurations(marketStatus, ignoreMarketStatus = false) {
        if (marketStatus !== "closed" || ignoreMarketStatus) {
            try {
                const queries = await Queries.find({ results: null });

                const savePromises = queries.map(async (query) => {
                    if (query.duration > 1) {
                        query.duration -= 1;
                        await query.save();
                    } else if (query.duration === 1) {
                        query.duration = 0;
                        query.needsUpdate = true;
                        await query.save();
                    }
                });

                await Promise.all(savePromises);
            } catch (err) {
                console.log(err);
            }
        }
    }

    async updateResultsAndScores() {
        const queries = await Queries.find({ needsUpdate: true });

        const currentDateObj = new Date();
        const currentDateString = stockQuery.generateDateString(currentDateObj);

        for (const query of queries) {
            try {
                console.log(`Requesting ${query.ticker} closing price`);
                const dailyCloseRequest = await axios.get(
                    `https://api.polygon.io/v1/open-close/${query.ticker}/${currentDateString}?adjusted=true&apiKey=${process.env.POLYGON_API_KEY}`
                );

                const dailyClose = dailyCloseRequest.data.close;

                if (dailyClose) {
                    query.result = +dailyClose;
                    query.needsUpdate = false;
                    query.updatedAt = currentDateObj;
                    await query.save();

                    console.log(`${query.ticker} closed at a price of $${dailyClose}`);
                    console.log(`Updating scores for ${query._id}: ${query.ticker}`);
                    try {
                        const votes = await Votes.find({ queryID: query._id });
                        const previousClosingPrice = +query.lastClosingPrice;
                        const finalClosingPrice = +query.result;
                        const actualPercentageChange = ((previousClosingPrice - finalClosingPrice) / previousClosingPrice) * -100;

                        for (const vote of votes) {
                            const prediction = +vote.prediction;
                            const userPercentageChange = ((previousClosingPrice - prediction) / previousClosingPrice) * -100;

                            if ((actualPercentageChange > 0 && userPercentageChange) < 0 || (actualPercentageChange < 0 && userPercentageChange > 0)) {
                                vote.score = 0;
                                vote.isActive = false;
                                await vote.save();
                            } else {
                                const diffInPercentage = Math.abs(actualPercentageChange - userPercentageChange);
                                const points = diffInPercentage < 0.04 ? 50 : diffInPercentage > 5 ? 0 : 1 / diffInPercentage;
                                vote.score = points;
                                vote.isActive = false;
                                vote.addScoreToUser = true;
                                await vote.save();
                            }
                        }
                    } catch (err) {
                        console.log(err);
                    }
                }
            } catch (err) {
                console.log(err.message);
            }
        }
    }

    async updateScores() {
        const votes = await Votes.find({ addScoreToUser: true });

        for (const vote of votes) {
            try {
                const user = await User.findOne({ _id: vote.userID });
                user.rankedScore += vote.score;
                await user.save();
                vote.addScoreToUser = false;
                await vote.save();
            } catch (error) {
                console.log(error);
            }
        }
    }
}

module.exports = new ScheduledFunctions();
