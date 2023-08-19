"use strict";

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { authenticateJWT } = require("./middlewares/authMiddleware");
const { NotFoundError } = require("./expressError");

const app = express();

app.use(morgan("dev"));
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(authenticateJWT);

const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);

const userRoutes = require("./routes/userRoutes");
app.use("/users", userRoutes);

const queryRoutes = require("./routes/queryRoutes");
app.use("/queries", queryRoutes);

const assetRoutes = require("./routes/assetRoutes");
app.use("/assets", assetRoutes);

const voteRoutes = require("./routes/voteRoutes");
app.use("/votes", voteRoutes);

app.use(function (req, res, next) {
    return next(new NotFoundError());
});

app.use(function (err, req, res, next) {
    if (process.env.NODE_ENV !== "test") console.error(err.stack);
    const status = err.status || 500;
    const message = err.message;

    return res.status(status).json({
        error: { message, status },
    });
});

module.exports = app;
