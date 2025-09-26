// routes/auth.routes.js
const express = require("express");
const router = express.Router();
const {
  register,
  login,
  verifyOtp,
  logout,
} = require("../controllers/auth.controller"); // adjust path if needed
const { registerValidation } = require("../validators/authValidator");
const { validate } = require("../middlewares/isValidated");
const { isAuthTempToken } = require("../middlewares/isAuthTempToken");
const { isAuthenticated } = require("../middlewares/isAuthenticated");

// Register route
router.post("/register", registerValidation, validate, register);
// router.post("/register", register);

// Login route
router.post("/login", login);

// Verify OTP
router.post("/verify-otp", verifyOtp);

// isAuthenticated
router.get("/isAuthenticated", isAuthenticated, (req, res) => {
  res.status(200).json({ success: true, user: req.user });
});

// Signout route
router.post("/logout", logout);

module.exports = router;
