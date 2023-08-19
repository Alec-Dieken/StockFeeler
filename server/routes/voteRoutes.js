const express = require("express");
const Votes = require("../models/Votes");
const Queries = require("../models/Queries");
const router = express.Router();
const { loginRequired, ensureCorrectUserOrAdmin } = require("../middlewares/authMiddleware");

// ADD ENSURECORRECTUSER SO THAT IT WORKS WITH USERID
router.post("/", loginRequired, async (req, res) => {
    try {
        const { userID, queryID, prediction } = req.body;
        const vote = await Votes.addVote(userID, queryID, prediction);
        const average = await Queries.updateAverage(userID, queryID, prediction);
        res.json({ vote: vote, average });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occured while adding a vote" });
    }
});

router.get("/:userID", loginRequired, async (req, res) => {
    try {
        const userID = req.params.userID;
        const votesArray = await Votes.find({ userID }).sort({_id: -1}).lean();

        const votes = await Promise.all(votesArray.map(async (vote, i) => {
            const query = await Queries.findOne({ _id: vote.queryID }).lean();
            return { ...vote, query };
        }));

        res.json({ votes });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred while fetching votes" });
    }
});

module.exports = router;
