const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const chatSchema = new Schema({
  _id: { type: String },
  user_id: { type: String, required: true },
  lastMessage: { type: String, default: null },
});

module.exports = chatSchema;
