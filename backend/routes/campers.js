const express = require('express');
const router = express.Router();
const Camper = require('../models/camper');
const User = require('../models/user');
const mongoose = require('mongoose');

//  Create a camper (POST /api/campers)
router.post('/', async (req, res) => {
  try {
    const camper = new Camper(req.body);
    await camper.save();
    res.status(201).json(camper);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//  Get all campers (GET /api/campers)
router.get('/', async (req, res) => {
  try {
    const campers = await Camper.find().populate('reviews.user', 'name');
    res.json(campers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//  Get single camper by ID (GET /api/campers/:id)
router.get('/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid camper ID' });
    }

    const camper = await Camper.findById(req.params.id).populate(
      'reviews.user',
      'name'
    );
    if (!camper) return res.status(404).json({ error: 'Camper not found' });

    res.json(camper);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//  Update a camper (PUT /api/campers/:id)
router.put('/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid camper ID' });
    }

    const camper = await Camper.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!camper) return res.status(404).json({ error: 'Camper not found' });

    res.json(camper);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//  Delete a camper (DELETE /api/campers/:id)
router.delete('/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid camper ID' });
    }

    const camper = await Camper.findByIdAndDelete(req.params.id);
    if (!camper) return res.status(404).json({ error: 'Camper not found' });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add or update a review for a camper (POST /api/campers/:id/review)
router.post('/:id/review', async (req, res) => {
  try {
    const { userId, comment } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    // Check the validity of IDs
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid camper ID' });
    }
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    // We find a camper
    const camper = await Camper.findById(req.params.id);
    if (!camper) return res.status(404).json({ error: 'Camper not found' });

    // We find the user
    const user = await User.findById(userId);
    if (!user) return res.status(400).json({ error: 'User not found' });

    // Check if the user left a review
    const existingReview = camper.reviews.find(
      (rev) => rev.user && rev.user.toString() === userId.toString()
    );

    if (existingReview) {
      // If the review is already there, we update it
      existingReview.comment = comment;
      existingReview.date = new Date();
    } else {
      // If there is no review, add a new one
      camper.reviews.push({
        user: mongoose.Types.ObjectId.createFromHexString(userId),
        comment,
        date: new Date(),
      });
    }

    await camper.save();
    res.status(201).json(camper);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
