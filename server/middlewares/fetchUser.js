const jwt = require("jsonwebtoken");

const PRIVATE_KEY = process.env.JWT_SECRET;

const fetchUser = async (req, res, next) => {
  const authToken = req.header("auth-token");

  if (!authToken) {
    return res.status(200).json({
      success: false,
      error: "empty auth token",
      errorField: "auth-token",
    });
  }

  try {
    const data = jwt.verify(authToken, PRIVATE_KEY);

    req.user = data.user;
    next();
  } catch (error) {
    res.status(200).json({
      success: false,
      error: "invalid auth token",
      errorField: "auth-token",
    });
  }
};

module.exports = fetchUser;
