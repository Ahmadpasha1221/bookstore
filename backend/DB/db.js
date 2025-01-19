const mongoose = require("mongoose");
const env = require("dotenv");
env.config();
const db = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Database connected successfully");
  } catch (err) {
    console.error("Database connection failed:", err.message);
  }
};
module.exports = db;
