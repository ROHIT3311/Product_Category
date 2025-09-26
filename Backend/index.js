const express = require("express");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/auth.routes");
const partRoutes = require("./routes/part.routes");
const reqPartsRoutes = require("./routes/reqParts.routes");
const serverless = require("serverless-http");

const app = express();

// Connect MongoDB
connectDB();

// ✅ Your frontend deployed domain (no trailing slash!)
const FRONTEND_URL = "https://product-category-sget.vercel.app";

// ✅ Allow only frontend origin
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Ensure OPTIONS requests are handled
app.options(
  "*",
  cors({
    origin: FRONTEND_URL,
    credentials: true,
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

// Default
app.get("/", (req, res) => {
  res.json({ message: "Default Route Working" });
});

// ✅ Export for Vercel
module.exports = serverless(app);
