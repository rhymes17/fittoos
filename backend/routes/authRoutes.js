const express = require("express");
const {
  registerUser,
  loginUser,
  getMe,
} = require("../controllers/authController");
const protect = require("../middleware/authMiddlware");
const router = express.Router();

//Register a user
router.post("/register", registerUser);

//Loign a user
router.post("/login", loginUser);

router.get("/me", protect, getMe);

module.exports = router;
