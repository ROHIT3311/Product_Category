// middlewares/isAuthTempToken.js
const jwt = require("jsonwebtoken");

module.exports.isAuthTempToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Authorization token missing or invalid" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.TEMP_TOKEN_SECRET); // TEMP_TOKEN_SECRET used for OTP step
    req.tempUser = decoded; // contains email only
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Invalid or expired temporary token" });
  }
};
