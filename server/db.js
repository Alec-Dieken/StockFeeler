"use strict";

const mongoose = require("mongoose");
require("dotenv").config();
require("colors");

async function db_connect() {
    mongoose
        .connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log("DB CONNECTED".green))
        .catch((err) => console.log(`DB CONNECTION ERROR: ${err}`.red));
}

module.exports = {
    db_connect,
};
