require("dotenv").config();
const express = require("express");
const cors = require("cors");
/* const mongoose = require("mongoose"); */
const morgan = require("morgan");

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// Connect to MongoDB
const connectDB = require("./db");
connectDB();

// Connect models
require("./models/user");
require("./models/camper");

// Connect routes
const camperRoutes = require("./routes/campers");
app.use("/api/campers", camperRoutes);

const userRoutes = require("./routes/users");
app.use("/api/users", userRoutes);

//  Health Check Route
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

//middleware for centralized error handling.
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message || "Internal Server Error" });
  next(err);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
