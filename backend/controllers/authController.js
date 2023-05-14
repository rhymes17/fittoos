const asyncHandler = require("express-async-handler");
const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// @desc Register a new user
// @route POST '/api/users/register'
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  //Validation
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  //Check if user already exists
  const userExists = await User.findOne({ email });

  //Check for username
  const userNameExists = await User.findOne({ username });

  //If it exists
  if (userExists || userNameExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  //Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  res.status(201).json({
    id: user._id,
    username: user.username,
    email: user.email,
    token: generateToken(user._id),
  });
});

// @desc Login a user
// @route POST 'api/users/login'
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  //chek if user exists
  const user = await User.findOne({ username });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const getMe = (req, res) => {
  res.send(req.user);
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: "30d" });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
