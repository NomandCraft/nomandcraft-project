const express = require("express");
const router = express.Router();
const Camper = require("../models/camper");
const User = require("../models/user");
const mongoose = require("mongoose");
/* const Review = require("../models/review"); */

// POST /api/campers – create a camper
router.post("/", async (req, res) => {
  try {
    const camper = new Camper(req.body);
    await camper.save();
    res.status(201).json(camper);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET /api/campers – list of campers
router.get("/", async (req, res) => {
  try {
    const campers = await Camper.find().populate("reviews.user", "name");
    res.json(campers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Adding a review to camper (Post/API/CAMPERS/: ID/ReView)
router.post("/:id/review", async (req, res) => {
  try {
    const { userId, rating, comment } = req.body;

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid camper ID" });
    }

    // Find a camper on ID
    const camper = await Camper.findById(req.params.id);
    if (!camper) {
      return res.status(404).json({ error: "Camper not found" });
    }

    // Find the user in the database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // Check if the user has already left a review
    const existingReview = camper.reviews.find(
      (rev) => rev.user.toString() === userId
    );
    if (existingReview) {
      return res
        .status(400)
        .json({ error: "User has already reviewed this camper" });
    }
    // Add a new review
    const newReview = {
      user: user._id,
      rating,
      comment,
      date: new Date(),
    };
    camper.reviews.push(newReview);

    // Restore the average rating
    const totalRating = camper.reviews.reduce(
      (sum, rev) => sum + rev.rating,
      0
    );
    camper.averageRating = totalRating / camper.reviews.length;

    // Сохранить обновлённый кемпер
    await camper.save();
    res.status(201).json(camper);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;
