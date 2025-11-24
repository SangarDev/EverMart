const mongoose = require("mongoose");

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 20000, // 20 seconds
        });
        console.log("Connected to the database successfully");
    } catch (err) {
        console.error("Error connecting to the database:", err);
    }
}

module.exports = connectDB;
