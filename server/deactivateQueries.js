const mongoose = require("mongoose");
const ScheduledFunctions = require("./ScheduledFunctions");
require("colors")

// Connect to your MongoDB database
mongoose.connect('mongodb+srv://ajdieken:LbtXwZCkxvHw6Zdd@stockfeeler.rm84vkj.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.once("open", async function () {
    console.log("Connected to the database.");

    try {
        // Run your batchCreate method here
        console.log("Deactivating all queries...".magenta);
        const marketStatus = await ScheduledFunctions.deactivateQueries(false);
        console.log("'deactivateQueries' complete".green);

        // console.log("Updating durations...".magenta);
        // await ScheduledFunctions.updateDurations("open", true);
        // console.log("'updateDurations' complete".green);

        // const date = new Date();
        // console.log(`Job complete at ${date.toLocaleString()}`.green);
    } catch (error) {
        console.error("Error during batch create operation:", error);
    } finally {
        // Always close the database connection when you're done
        mongoose.connection.close();
    }
});
