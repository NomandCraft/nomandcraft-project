import mongoose from 'mongoose';
import Category from '../models/category.js';
import catchAsync from '../utils/catchAsync.js';

const { isValidObjectId } = mongoose;

// POST /api/categories
export const createCategory = catchAsync(async (req, res) => {
  const data = { name: req.body.name, description: req.body.description };
  try {
    const category = await Category.create(data);
    res.status(201).json(category);
  } catch (error) {
    if (error?.code === 11000) {
      return res
        .status(409)
        .json({ error: 'Category already exists', details: error.keyValue });
    }
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    throw error;
  }
});

// GET /api/categories
export const getAllCategories = catchAsync(async (_req, res) => {
  const categories = await Category.find().sort({ name: 1 }).lean();
  res.json(categories);
});

// GET /api/categories/:id
export const getCategoryById = catchAsync(async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(400).json({ error: 'Invalid category ID format' });
  }
  const category = await Category.findById(id).lean();
  if (!category) return res.status(404).json({ error: 'Category not found' });
  res.json(category);
});

// PATCH /api/categories/:id
export const updateCategory = catchAsync(async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(400).json({ error: 'Invalid category ID format' });
  }

  const data = { name: req.body.name, description: req.body.description };
  try {
    const category = await Category.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).lean();
    if (!category) return res.status(404).json({ error: 'Category not found' });
    res.json(category);
  } catch (error) {
    if (error?.code === 11000) {
      return res
        .status(409)
        .json({ error: 'Category already exists', details: error.keyValue });
    }
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    throw error;
  }
});

// DELETE /api/categories/:id
export const deleteCategory = catchAsync(async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(400).json({ error: 'Invalid category ID format' });
  }
  const category = await Category.findByIdAndDelete(id);
  if (!category) return res.status(404).json({ error: 'Category not found' });
  res.status(204).end();
});
