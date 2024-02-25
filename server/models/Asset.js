const mongoose = require("mongoose");

const NewsDataSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        author: String,
        publishDate: Date,
        articleUrl: String,
        imageUrl: String,
    },
    { _id: false }
);

const AssetSchema = new mongoose.Schema({
    ticker: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    description: { type: String },
    website: { type: String },
    type: { type: String },
    news: [NewsDataSchema],
});

AssetSchema.statics.create = async function (ticker, name, description = null, website = null, type=null, news = []) {
    const Asset = this;
    const asset = new Asset({ ticker, name, description, website, type, news });
    await asset.save();
    return asset;
};

module.exports = mongoose.model("Asset", AssetSchema);
