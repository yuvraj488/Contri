const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const errorMiddleware = require("./middlewares/errorMiddleware");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Contri API is running 🚀",
  });
});

// Global Error Handler (Always Last)
app.use(errorMiddleware);

module.exports = app;