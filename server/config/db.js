const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB connected: ${conn.connection.host}`);

    return conn;
  } catch (err) {
    console.error(`Error connecting to MongoDB: ${err.message}`);
    throw err;
  }
};

module.exports = connectDB;