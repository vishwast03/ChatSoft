const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  _id: { type: String },
  text: { type: String, required: true },
  fromUserId: { type: String, required: true },
  sentDateTime: { type: Date, required: true },
  chat_id: { type: String, required: true },
});

module.exports = mongoose.model("message", messageSchema);
