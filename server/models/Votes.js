const mongoose = require("mongoose");

const VotesSchema = new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    queryID: { type: mongoose.Schema.Types.ObjectId, ref: "Queries", required: true },
    prediction: { type: Number, required: true },
    isActive: { type: Boolean, default: true },
    score: { type: Number, default: null },
    createdAt: { type: Date, default: Date.now },
    addScoreToUser: {type: Boolean, default: false}
});

// ADD CHECK TO MAKE SURE THERE AREN'T DUPLICATE VOTES - USERID and QUERYID CAN'T BE DUPLICATE
VotesSchema.statics.addVote = async function (userID, queryID, prediction) {
    const Vote = this;

    const vote = new Vote({ userID, queryID, prediction });

    await vote.save();

    return vote;
};


module.exports = mongoose.model("Votes", VotesSchema);
