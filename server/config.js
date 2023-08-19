"use strict";

require("dotenv").config();
require("colors");

const SECRET_KEY = process.env.SECRET_KEY || "NothingToSeeHere";

const PORT = +process.env.PORT || 8080;

const MONGO_URI = process.env.MONGO_URI;
const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 12;

console.log("Configurations:".yellow);
console.log("SECRET_KEY:".blue, SECRET_KEY);
console.log("PORT:".blue, PORT.toString());
console.log("BCRYPT_WORK_FACTOR".blue, BCRYPT_WORK_FACTOR);
console.log("Database:".blue, MONGO_URI);
console.log("---");

module.exports = {
    SECRET_KEY,
    PORT,
    BCRYPT_WORK_FACTOR,
    MONGO_URI,
};
