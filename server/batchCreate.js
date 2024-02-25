const mongoose = require("mongoose");
const ScheduledFunctions = require("./ScheduledFunctions");
require("colors");

// Connect to your MongoDB database
mongoose.connect('mongodb+srv://ajdieken:LbtXwZCkxvHw6Zdd@stockfeeler.rm84vkj.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.once("open", async function () {
    console.log("Connected to the database.");

    try {
        let date = new Date();
        console.log(`Creating new queries at ${date.toLocaleString()}`.magenta);
        await ScheduledFunctions.batchCreateQueries(25);

        date = new Date();
        console.log(`'batchCreateQueries' complete at ${date.toLocaleString()}`.green);
        console.log("Job complete".green);
    } catch (error) {
        console.error("Error during batch create operation:", error);
    } finally {

        mongoose.connection.close();
    }
});
