const express = require("express");
const User = require("../models/User");
const router = express.Router();

// Register a new user
router.post("/register", async (req, res) => {
    const { username, password } = req.body;

    try {
        const token = await User.register(username, password);
        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(400).json({ msg: err.message });
    }
});

// Login a user
router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const token = await User.login(username, password);
        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(400).json({ msg: err.message });
    }
});

module.exports = router;
