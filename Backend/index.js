const express = require("express");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/auth.routes");
const partRoutes = require("./routes/part.routes");
const reqPartsRoutes = require("./routes/reqParts.routes");
const app = express();
const PORT = process.env.PORT || 8000;

// Connect to MongoDB Atlas
connectDB();

app.use(
  cors({
    origin: "*",
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
  res.send("Default Route Working");
});

// Start Server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

// for vercel deployment
module.exports = app;
