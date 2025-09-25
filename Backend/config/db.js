const mongoose = require("mongoose");
require("dotenv").config(); // ensure env variables are loaded

const connectDB = async () => {
  const uri = process.env.MONGO_URL;

  if (!uri) {
    console.error(
      "MongoDB connection failed: MONGO_URL is not defined in environment variables"
    );
    process.exit(1);
  }

  try {
    await mongoose.connect(uri); // no deprecated options needed
    console.log("MongoDB Atlas connected successfully");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
