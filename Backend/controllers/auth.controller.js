const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const UserId = require("../models/userId.model");
const { sendMailForRegister } = require("../config/email");
const otpGenerator = require("otp-generator");
const nodemailer = require("nodemailer");
require("dotenv").config();

module.exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, company_name, password, pid } =
      req.body;

    if (!(firstName && lastName && email && company_name && password && pid)) {
      return res.status(400).send("All fields are required");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User already exists");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);
    const isUserId = await UserId.findOne({ pid });

    if (!isUserId) {
      return res.status(400).json({ message: "PID is not registered" });
    }

    const user = await User.create({
      firstName,
      lastName,
      email,
      company_name,
      password: encryptedPassword,
      pid,
    });

    const token = jwt.sign({ id: user._id, email }, process.env.SECRET_KEY, {
      expiresIn: "2h",
    });

    user.token = token;
    user.password = undefined;

    await sendMailForRegister(email, password);
    res.status(201).json(user);
  } catch (error) {
    console.error("Registration Error:", error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res
        .status(400)
        .json({ message: "Email and Password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpiry = Date.now() + 5 * 60 * 1000; // 5 minutes from now
    await user.save();

    // Send OTP via email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP for login",
      html: `<p>Your OTP is <b>${otp}</b>. It will expire in 5 minutes.</p>`,
    });

    // Generate temporary JWT (email only)
    const tempToken = jwt.sign({ email }, process.env.TEMP_TOKEN_SECRET, {
      expiresIn: "5m",
    });

    // Set temp token in a cookie (HTTP-only, secure in production)
    res.cookie("temp_token", tempToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 5 * 60 * 1000, // 5 minutes
      sameSite: "Strict",
    });

    return res.status(200).json({
      success: true,
      message: "OTP sent to your email. Please verify.",
      token: tempToken,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports.verifyOtp = async (req, res) => {
  try {
    const { otp } = req.body;
    const tempToken = req.cookies?.temp_token;

    if (!otp || !tempToken) {
      return res
        .status(400)
        .json({ success: false, message: "OTP and temp token are required" });
    }

    let decoded;
    try {
      decoded = jwt.verify(tempToken, process.env.TEMP_TOKEN_SECRET);
    } catch (err) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid or expired temp token" });
    }

    const email = decoded.email;
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (user.otp !== otp || Date.now() > user.otpExpiry) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired OTP" });
    }

    // Clear OTP fields
    user.otp = undefined;
    user.otpExpiry = undefined;

    // Generate login token (valid for 24h)
    const loginToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "24h",
    });

    user.token = loginToken;
    await user.save();

    const userObj = user.toObject();
    delete userObj.password;

    // Clear temp_token and set main token in cookie
    res
      .clearCookie("temp_token")
      .cookie("token", loginToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Set this to true in prod
        sameSite: "Lax",
        maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
      })
      .status(200)
      .json({
        success: true,
        message: "OTP verified, login successful",
        user: userObj,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// controllers/authController.js
module.exports.logout = async (req, res) => {
  try {
    if (!req.cookies.token) {
      return res.status(404).json({ message: "User not logged in" });
    }

    res.clearCookie("token");
    return res.status(200).json({ message: "Signout Successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
