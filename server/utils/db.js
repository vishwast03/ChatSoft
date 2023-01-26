const mongoose = require("mongoose");

const connectToDB = () => {
  const URI = process.env.MONGO_URI;

  mongoose.set("strictQuery", false);
  mongoose.connect(URI, () => {
    console.log("Connection to MongoDB was successful.");
  });
};

module.exports = connectToDB;
