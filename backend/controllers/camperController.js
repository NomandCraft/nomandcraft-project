import Camper from '../models/camper.js';
import catchAsync from '../utils/catchAsync.js';

export const createCamper = catchAsync(async (req, res, next) => {
  try {
    const camper = new Camper(req.body);
    await camper.validate(); // Проверяем перед сохранением
    await camper.save();
    res.status(201).json(camper);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message }); // Явная ошибка валидации
    }
    next(error); // Передаём в errorHandler
  }
});

export const getAllCampers = catchAsync(async (req, res) => {
  const campers = await Camper.find().populate('reviews.user', 'name');
  res.json(campers);
});

export const getCamperById = catchAsync(async (req, res, next) => {
  const camper = await Camper.findById(req.params.id).populate(
    'reviews.user',
    'name'
  );
  if (!camper) {
    const error = new Error('Camper not found');
    error.statusCode = 404;
    return next(error);
  }
  res.json(camper);
});

export const updateCamper = catchAsync(async (req, res, next) => {
  const camper = await Camper.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true, // Включаем валидацию при обновлении
  });
  if (!camper) {
    const error = new Error('Camper not found');
    error.statusCode = 404;
    return next(error);
  }
  res.json(camper);
});

export const deleteCamper = catchAsync(async (req, res, next) => {
  const camper = await Camper.findByIdAndDelete(req.params.id);
  if (!camper) {
    const error = new Error('Camper not found');
    error.statusCode = 404;
    return next(error);
  }
  res.status(204).end();
});
