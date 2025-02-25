require("dotenv").config();
const express = require("express");
const cors = require("cors");
/* const mongoose = require("mongoose"); */
const morgan = require("morgan");

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

//  Routes
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Connect routes
const camperRoutes = require("./routes/campers");
app.use("./api/campers", camperRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Connect to MongoDB
const connectDB = require("./db");
connectDB();
