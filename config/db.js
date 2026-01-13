require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const mongoDB_URI = process.env.MONGODB_URI;

        if (!mongoDB_URI) {
            throw new Error(
                "MONGODB_URI is not defined in environment variables"
            );
        }

        await mongoose.connect(mongoDB_URI);

        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        process.exit(1); // Exit process with failure
    }
};

// Handle connection events
mongoose.connection.on("error", (error) => {
    console.error("MongoDB error:", error.message);
});

mongoose.connection.on("disconnected", () => {
    console.warn("MongoDB disconnected");
});

module.exports = connectDB;
