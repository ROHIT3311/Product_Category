const express = require("express");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/auth.routes");
const partRoutes = require("./routes/part.routes");
const reqPartsRoutes = require("./routes/reqParts.routes");
const serverless = require("serverless-http"); // needed for Vercel

const app = express();

// Connect to MongoDB Atlas
connectDB();

// Allow your frontend domain only
const FRONTEND_URL = "https://product-category-xi.vercel.app/";

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/part", partRoutes);
app.use("/api/req", reqPartsRoutes);

// Default Route
app.get("/", (req, res) => {
  res.json({ message: "Default Route Working" }); // always return JSON
});

// Export for serverless
// module.exports = serverless(app);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});

module.exports = app; // export app for serverless
