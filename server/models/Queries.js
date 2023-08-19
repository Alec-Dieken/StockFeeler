const mongoose = require("mongoose");
const Votes = require("./Votes");
const User = require("./User");
require("dotenv").config();

const ChartDataSchema = new mongoose.Schema(
    {
        c: Number,
        h: Number,
        l: Number,
        n: Number,
        o: Number,
        t: Number,
        v: Number,
        vw: Number,
    },
    { _id: false }
);

const QueriesSchema = new mongoose.Schema({
    ticker: { type: String, required: true },
    duration: { type: Number, required: true },
    chartData: [ChartDataSchema],
    lastClosingPrice: { type: Number, required: true },
    avgChange: { type: Number, required: true },
    result: { type: Number, default: null },
    average: { type: Number, default: null },
    isActive: { type: Boolean, default: true },
    needsUpdate: { type: Boolean, default: false },
    random: {
        type: Number,
        default: function () {
            return Math.random();
        },
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: null },
});

QueriesSchema.statics.create = async function (ticker, duration, chartData, lastClosingPrice, avgChange) {
    const Query = this;

    const query = new Query({ ticker, duration, chartData, lastClosingPrice, avgChange });
    await query.save();

    return query;
};

QueriesSchema.statics.updateAverage = async function (userID, queryID, prediction) {
    const Queries = mongoose.model("Queries", QueriesSchema);

    const query = await Queries.findById(queryID);
    const numOfvotes = await Votes.countDocuments({ queryID: queryID });
    const user = await User.findById(userID);

    const userAvgDailyPercentageChange = (Math.abs((prediction - query.lastClosingPrice) / query.lastClosingPrice) / query.duration) * 100;

    let shouldUpdateAverage = false;

    if (userAvgDailyPercentageChange <= 1.5 * query.avgChange) {
        shouldUpdateAverage = true;
    } else if (userAvgDailyPercentageChange <= 2.5 * query.avgChange && user.trustScore > 90) {
        shouldUpdateAverage = true;
    } else if (userAvgDailyPercentageChange <= 3 * query.avgChange && user.trustScore > 98) {
        shouldUpdateAverage = true;
    }

    if (shouldUpdateAverage) {
        query.average = query.average === null ? prediction : (prediction + query.average) / numOfvotes;
    } else if (query.average === null) {
        query.average = query.lastClosingPrice;
    }

    await query.save();

    return query.average;
};

module.exports = mongoose.model("Queries", QueriesSchema);
