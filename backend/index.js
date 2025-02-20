require("dotenv").config();
const express = require("express");
const cors = require("cors");
/* const mongoose = require("mongoose"); */
const morgan = require("morgan");

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// Routes
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Connect to MongoDB
// mongoose
// 	.connect(process.env.MONGODB_URI, {
// 		useNewUrlParser: true,
// 		useUnifiedTopology: true,
// 	})
// 	.then(() => {
// 		console.log("Connected to MongoDB");
// 	})
// 	.catch((error) => {
// 		console.error("Error connecting to MongoDB:", error);
// 	});
