"use strict";

const app = require("./app");
const { PORT } = require("./config");
const { db_connect } = require("./db");
const {deactivateOneDays, deactivateQueriesAndUpdateDurations, updateResultsAndBatchCreate} = require("./task")
require("colors");

db_connect();

app.listen(PORT, function () {
    console.log(`Started on http://localhost:${PORT}`.green);
    deactivateOneDays.start();
    deactivateQueriesAndUpdateDurations.start();
    updateResultsAndBatchCreate.start();
});
