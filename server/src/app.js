const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const groupRoutes = require("./routes/groupRoutes");

const errorMiddleware = require("./middlewares/errorMiddleware");

const expenseRoutes = require("./routes/expenseRoutes");

const app = express();

/* -------------------- Global Middleware -------------------- */

app.use(cors());
app.use(express.json());

/* ------------------------ Routes --------------------------- */

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Contri API is running 🚀",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/expenses", expenseRoutes);
/* ------------------- Global Error Handler ------------------ */

app.use(errorMiddleware);

module.exports = app;