const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const mongoose = require("mongoose");
const User = require("../models/user");
const Message = require("../models/message");
const fetchUser = require("../middlewares/fetchUser");

// ROUTE 1: Get selected chat using: POST "/chat/init" - Login required
router.post(
  "/init",
  [fetchUser, body("user_id", "user_id must be a string").isString()],
  async (req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Chech if user exists or not
      const user = await User.findById(req.user._id);

      if (!user) {
        return res.status(200).json({
          success: false,
          error: "Invalid auth token",
          errorField: "auth-token",
        });
      }

      // Find the relevant chat if exists
      let chat = user.chats.find((chat) => chat.user_id === req.body.user_id);

      if (chat) {
        res.status(200).json({ success: true, chat_id: chat._id });
      } else {
        // If the chat doesn't exists already, then create a new chat
        const newChat = {
          _id: `cht_${new mongoose.Types.ObjectId().toString()}`,
          user_id: req.body.user_id,
        };

        res.status(200).json({ success: true, chat_id: newChat._id });

        user.chats.push(newChat);
        user.save();

        const connectedUser = await User.findById(req.body.user_id);
        connectedUser.chats.push({
          _id: newChat._id,
          user_id: req.user._id,
        });
        connectedUser.save();
      }
    } catch (error) {
      res.status(500).send("Internal server error");
    }
  }
);

// ROUTE 2: Get chat messages using: POST "/chat/fetch" - Login required
router.post(
  "/fetch",
  [fetchUser, body("chat_id", "chat_id must be a string").isString()],
  async (req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const messages = await Message.find({ chat_id: req.body.chat_id });

      res.status(200).json({ success: true, messages });
    } catch (error) {
      res.status(500).send("Internal server error");
    }
  }
);

module.exports = router;
