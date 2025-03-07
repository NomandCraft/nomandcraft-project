const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Category = require('../models/category.js');

// POST /api/categories  -Create a category

router.post('/', async (req, res) => {
  try {
    // Create a new category
    const category = new Category(req.body);

    // Save the category
    await category.save();

    // If the creation was successful, return the category
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET /api/categories – get a list of all categories

router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/categories/:id – get a category by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    // Find the category
    const category = await Category.findById(id);

    // If the category is not found, return a 404 error
    if (!category) return res.status(404).json({ error: 'Category not found' });

    // If the find was successful, return the category
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

// PUT /api/categories/:id – update the category
router.put('/:id', async (req, res) => {
  try {
    // Get the category ID
    const { id } = req.params;

    // Check if the ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    // Update the category
    const category = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    // If the category is not found, return a 404 error
    if (!category) return res.status(404).json({ error: 'Category not found' });

    // If the update was successful, return the updated category
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

// DELETE /api/categories/:id – delete the category

router.delete('/', async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    // Delete the category
    const category = await Category.findByIdAndDelete(id);

    // If the category is not found, return a 404 error
    if (!category) return res.status(404).json({ error: 'Category not found' });

    //If the removal was successful - we send status 204 (no content)
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

// Export the router
module.exports = router;
