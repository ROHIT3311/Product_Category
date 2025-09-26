// middlewares/isAuthenticated.js
const jwt = require("jsonwebtoken");

module.exports.isAuthenticated = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Not Authenticated" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    req.user = decoded; // attach user info to request
    next(); // pass control to the next middleware/route handler
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid Token" });
  }
};
