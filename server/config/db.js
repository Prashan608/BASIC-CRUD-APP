const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI;

const connectToDb = async () => {
  try {
    if (!MONGO_URI) {
      throw new Error("MONGO_URI not defined in .env file");
    }

    await mongoose.connect(MONGO_URI);

    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error.message);

    // Important for production (server stop kar de agar DB connect nahi hua)
    process.exit(1);
  }
};

module.exports = connectToDb;