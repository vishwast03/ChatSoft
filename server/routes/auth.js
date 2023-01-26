const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const User = require("../models/user");
const fetchUser = require("../middlewares/fetchUser");

const PRIVATE_KEY = process.env.JWT_SECRET;

// ROUTE 1: Create a new user using: POST "/auth/create" - No login required
router.post(
  "/create",
  [
    body("fullname", "fullname must be a string").isString(),
    body("email", "invalid email").isEmail(),
    body("password", "password must be at least 8 characters long").isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });

      if (user) {
        return res.status(200).json({
          success: false,
          error: "user already exists",
          errorField: "email",
        });
      }

      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(req.body.password, salt);

      user = await User.create({
        _id: `usr_${new mongoose.Types.ObjectId().toString()}`,
        fullname: req.body.fullname,
        email: req.body.email,
        password: hashPassword,
      });

      const data = { user: { _id: user._id, fullname: user.fullname } };
      const authToken = jwt.sign(data, PRIVATE_KEY);

      res.status(200).json({ success: true, authToken });
    } catch (error) {
      res.status(500).send("Internal server error");
    }
  }
);

// ROUTE 2: Authenticate a user using: POST "/auth/login" - No login required
router.post(
  "/login",
  [
    body("email", "invalid email").isEmail(),
    body("password", "password must be a string").isString(),
  ],
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findOne({ email: req.body.email });

      if (!user) {
        return res.status(200).json({
          success: false,
          error: "user doesn't exist",
          errorField: "email",
        });
      }

      const isPasswordCorrect = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!isPasswordCorrect) {
        return res.status(200).json({
          success: false,
          error: "incorrect password",
          errorField: "password",
        });
      }

      const data = { user: { _id: user._id, fullname: user.fullname } };
      const authToken = jwt.sign(data, PRIVATE_KEY);

      res.status(200).json({ success: true, authToken });
    } catch (error) {
      res.status(500).send("Internal server error");
    }
  }
);

// ROUTE 3: Get logged in user info using: GET "/auth/me" - Login required
router.get("/me", fetchUser, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password -chats");

    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
