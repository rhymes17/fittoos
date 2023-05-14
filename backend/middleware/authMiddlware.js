const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //Get token
      token = req.headers.authorization.split(" ")[1];

      //Decode the token
      const decoded = jwt.decode(token, process.env.SECRET_KEY);

      //Get the user using the decoded token
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      res.status(401);
      throw new Error("User not authenticated");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("User not authenticated");
  }
});

module.exports = protect;
