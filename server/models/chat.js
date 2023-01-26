const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const chatSchema = new Schema({
  _id: { type: String },
  user_id: { type: String, required: true },
});

module.exports = chatSchema;
