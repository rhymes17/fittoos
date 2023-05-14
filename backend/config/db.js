const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`Databse connected : ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(`Error occured : ${error.message}`.red.bold.underline);
  }
};

module.exports = connectDB;
