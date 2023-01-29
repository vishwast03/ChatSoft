const router = require("express").Router();
const User = require("../models/user");
const fetchUser = require("../middlewares/fetchUser");

// ROUTE 1: Get all users using: GET "/user/get" - Login required
router.get("/get", fetchUser, async (req, res) => {
  try {
    const users = await User.find({ _id: { $nin: [req.user._id] } }).select(
      "-password -chats"
    );

    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
