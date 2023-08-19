const cron = require("node-cron");
const Queries = require("./models/Queries");
const ScheduledFunctions = require("./ScheduledFunctions");
require("colors");

const deactivateOneDays = cron.schedule(
    "30 09 * * *",
    async () => {
        console.log("Running 'deactivateQueries' (1 days) at 09:30 AM EST (06:30 AM PST)".magenta);
        await ScheduledFunctions.deactivateQueries(false, false);
        const date = new Date();
        console.log(`'deactivateQueries' complete at ${date.toLocaleString()}`.green);
    },
    {
        scheduled: true,
        timezone: "America/New_York",
    }
);

const deactivateQueriesAndUpdateDurations = cron.schedule(
    "55 59 15 * * *",
    async () => {
        console.log("Running 'deactivateQueries' (all) and 'updateDurations' at 03:59:55 PM EST (12:59:55 PM PST)".magenta);

        console.log("Deactivating all queries...".magenta);
        const marketStatus = await ScheduledFunctions.deactivateQueries();
        console.log("'deactivateQueries' complete".green);

        console.log("Updating durations...".magenta);
        await ScheduledFunctions.updateDurations(marketStatus, false);
        console.log("'updateDurations' complete".green);

        const date = new Date();
        console.log(`Job complete at ${date.toLocaleString()}`.green);
    },
    {
        scheduled: true,
        timezone: "America/New_York",
    }
);

const updateResultsAndBatchCreate = cron.schedule(
    "30 15 16 * * *",
    async () => {
        console.log("Running 'updateResultsAndScores' and 'batchCreateQueries' at 04:15 PM EST (01:15 PM PST)".magenta);

        let date = new Date();

        console.log(`Updating results and scores at ${date.toLocaleString()}...`.magenta);
        await ScheduledFunctions.updateResultsAndScores();

        date = new Date();
        console.log(`'updateResultsAndScores' complete at ${date.toLocaleString()}`.green);

        console.log("Creating new queries...".magenta);
        await ScheduledFunctions.batchCreateQueries(50);

        date = new Date();
        console.log(`'batchCreateQueries' complete at ${date.toLocaleString()}`.green);
        console.log("Job complete".green);

        console.log("Updating Scores...".magenta)
        await ScheduledFunctions.updateScores();
        console.log("Updating Scores Complete".green);
    },
    {
        scheduled: true,
        timezone: "America/New_York",
    }
);

module.exports = { deactivateOneDays, deactivateQueriesAndUpdateDurations, updateResultsAndBatchCreate };
