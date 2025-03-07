import Camper from '../models/Camper.js';
import { catchAsync } from '../utils/catchAsync.js';

export const createCamper = catchAsync(async (req, res) => {
  const camper = await Camper.create(req.body);
  res.status(201).json(camper);
});

export const getAllCampers = catchAsync(async (req, res) => {
  const campers = await Camper.find().populate('reviews.user', 'name');
  res.json(campers);
});

export const getCamperById = catchAsync(async (req, res) => {
  const camper = await Camper.findById(req.params.id).populate(
    'reviews.user',
    'name'
  );
  if (!camper) throw new Error('Camper not found'); // Ошибка передаётся в errorHandler
  res.json(camper);
});

export const updateCamper = catchAsync(async (req, res) => {
  const camper = await Camper.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!camper) throw new Error('Camper not found');
  res.json(camper);
});

export const deleteCamper = catchAsync(async (req, res) => {
  const camper = await Camper.findByIdAndDelete(req.params.id);
  if (!camper) throw new Error('Camper not found');
  res.status(204).end();
});
