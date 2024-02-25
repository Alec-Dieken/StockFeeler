const express = require("express");
const Queries = require("../models/Queries");
const Votes = require("../models/Votes");
const router = express.Router();
const { loginRequired } = require("../middlewares/authMiddleware");

router.get("/", loginRequired, async (req, res) => {
    try {
        const queries = await Queries.find();
        res.json({ queries });
    } catch (err) {
        console.error(err.message);
        res.status(400).json({ msg: err.message });
    }
});

router.get("/random/:userID", loginRequired, async (req, res) => {
    try {
        const userID = req.params.userID;
        const votesArray = await Votes.find({ userID }).select("queryID").lean();
        const votesQueryIDArray = votesArray.map((obj) => obj.queryID);

        const r = Math.random();
        let query = await Queries.findOne({ _id: { $nin: votesQueryIDArray }, random: { $gte: r }, isActive: true }).lean();
        if (!query) {
            query = await Queries.findOne({ _id: { $nin: votesQueryIDArray }, random: { $lt: r }, isActive: true }).lean();
        }

        res.json({ query });
    } catch (err) {}
});

module.exports = router;
