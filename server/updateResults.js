const mongoose = require("mongoose");
const ScheduledFunctions = require("./ScheduledFunctions");

// Connect to your MongoDB database
mongoose.connect('mongodb+srv://ajdieken:LbtXwZCkxvHw6Zdd@stockfeeler.rm84vkj.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.once("open", async function () {
    console.log("Connected to the database.");

    try {
        // Run your batchCreate method here
        await ScheduledFunctions.updateResultsAndScores();

        console.log("operation completed.");
    } catch (error) {
        console.error("Error during batch create operation:", error);
    } finally {
        // Always close the database connection when you're done
        mongoose.connection.close();
    }
});
