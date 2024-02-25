const express = require("express");
const Users = require("../models/User");
const Votes = require("../models/Votes");
const router = express.Router();
const { loginRequired, ensureCorrectUserOrAdmin } = require("../middlewares/authMiddleware");
const User = require("../models/User");

//
router.get("/leaderboard", loginRequired, async (req, res) => {
    try {
        const users = await Users.find().select("username rankedScore").sort({ rankedScore: -1 }).lean();
        res.json({ users });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occured while getting users" });
    }
});

router.get("/account/:id", loginRequired, ensureCorrectUserOrAdmin, async (req, res) => {
    try {
        const id = req.params.id;
        const info = await Users.findOne({ _id: id }).select("avatar rankedScore username").lean();
        res.json({ info });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occured while getting users" });
    }
});

router.get("/avatar/:id", loginRequired, async (req, res) => {
    try {
        const id = req.params.id;
        const avatar = await Users.findOne({ _id: id }).select("avatar").lean();

        res.json({avatar});

    } catch (error) {}
});

router.post("/avatar/:id", loginRequired, ensureCorrectUserOrAdmin, async (req, res) => {
    try {
        const id = req.params.id;
        const user = await Users.findOne({ _id: id });

        user.avatar = req.body.avatar;
        await user.save();

        res.json({ avatar: user.avatar });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occured while getting users" });
    }
});

router.delete("/delete/:id", loginRequired, ensureCorrectUserOrAdmin, async (req, res) => {
    try {
        const userID = req.params.id;
        await Votes.deleteMany({ userID });
        await User.findByIdAndDelete(userID);
        res.status(200).send("Account successfully deleted.");
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occured while deleting user" });
    }
});

module.exports = router;
