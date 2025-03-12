import Camper from '../models/camper.js';
import catchAsync from '../utils/catchAsync.js';
import mongoose from 'mongoose';

// Создание нового кемпера
export const createCamper = catchAsync(async (req, res, next) => {
  try {
    if (
      req.body.category &&
      !mongoose.Types.ObjectId.isValid(req.body.category)
    ) {
      return res.status(400).json({ error: 'Invalid category ID format' });
    }

    const camper = new Camper(req.body);
    await camper.validate(); // Проверка перед сохранением
    await camper.save();
    res.status(201).json(camper);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    next(error);
  }
});

// Получение всех кемперов с фильтрацией
export const getAllCampers = catchAsync(async (req, res) => {
  const {
    category,
    minPrice,
    maxPrice,
    minSleepingCapacity,
    maxSleepingCapacity,
  } = req.query;
  const filter = {};

  if (category) {
    if (!mongoose.Types.ObjectId.isValid(category)) {
      return res.status(400).json({ error: 'Invalid category ID format' });
    }
    filter.category = new mongoose.Types.ObjectId(category);
  }

  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  if (minSleepingCapacity || maxSleepingCapacity) {
    filter.sleepingCapacity = {};
    if (minSleepingCapacity)
      filter.sleepingCapacity.$gte = Number(minSleepingCapacity);
    if (maxSleepingCapacity)
      filter.sleepingCapacity.$lte = Number(maxSleepingCapacity);
  }

  console.log('Applying filter:', filter);

  const campers = await Camper.find(filter)
    .populate('category', 'name') // Загружаем только поле `name` из категории
    .populate('reviews.user', 'name'); // Загружаем `name` пользователей

  res.json(campers);
});

// Получение одного кемпера по ID
export const getCamperById = catchAsync(async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'Invalid camper ID format' });
  }

  const camper = await Camper.findById(req.params.id).populate(
    'category reviews.user',
    'name'
  );
  if (!camper) {
    return next({ statusCode: 404, message: 'Camper not found' });
  }
  res.json(camper);
});

// Обновление кемпера
export const updateCamper = catchAsync(async (req, res, next) => {
  if (
    req.body.category &&
    !mongoose.Types.ObjectId.isValid(req.body.category)
  ) {
    return res.status(400).json({ error: 'Invalid category ID format' });
  }

  const camper = await Camper.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
    .populate('category', 'name')
    .populate('reviews.user', 'name');

  if (!camper) {
    return next({ statusCode: 404, message: 'Camper not found' });
  }

  res.json(camper);
});

// Удаление кемпера
export const deleteCamper = catchAsync(async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'Invalid camper ID format' });
  }

  const camper = await Camper.findByIdAndDelete(req.params.id);
  if (!camper) {
    return next({ statusCode: 404, message: 'Camper not found' });
  }

  res.status(204).end();
});
