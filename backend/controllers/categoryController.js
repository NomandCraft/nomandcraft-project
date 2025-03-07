import Category from '../models/Category.js';
import { catchAsync } from '../utils/catchAsync.js';

export const createCategory = catchAsync(async (req, res) => {
  const category = await Category.create(req.body);
  res.status(201).json(category);
});

export const getAllCategories = catchAsync(async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
});

export const getCategoryById = catchAsync(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) return res.status(404).json({ error: 'Category not found' });
  res.json(category);
});

export const updateCategory = catchAsync(async (req, res) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!category) return res.status(404).json({ error: 'Category not found' });
  res.json(category);
});

export const deleteCategory = catchAsync(async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category) return res.status(404).json({ error: 'Category not found' });
  res.status(204).end();
});
