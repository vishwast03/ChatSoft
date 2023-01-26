const mongoose = require("mongoose");
const chatSchema = require("./chat");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  _id: { type: String },
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isConnected: { type: Boolean, default: false },
  chats: [chatSchema],
});

module.exports = mongoose.model("user", userSchema);
