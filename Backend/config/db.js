const mongoose = require("mongoose");
require('dotenv').config();
const mongoURI = process.env.MONGO_URI;

const mongoconnect = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.log("MongoDB connection failed", error);
        process.exit(1);
    }   
};

module.exports = mongoconnect;