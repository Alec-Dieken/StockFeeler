const express = require("express");
const Asset = require("../models/Asset");
const router = express.Router();
const { loginRequired } = require("../middlewares/authMiddleware");

router.get("/:ticker", loginRequired, async (req, res) => {
    try {
        const ticker = req.params.ticker;
        const asset = await Asset.findOne({ticker}).lean();
        res.json({ asset });
    } catch (err) {
        console.error(err.message);
        res.status(400).json({ msg: err.message });
    }
});

module.exports = router;