import Camper from '../models/camper.js';
import catchAsync from '../utils/catchAsync.js';
import mongoose from 'mongoose';

// Creation of a new camper
export const createCamper = catchAsync(async (req, res, next) => {
  try {
    if (
      req.body.category &&
      !mongoose.Types.ObjectId.isValid(req.body.category)
    ) {
      return res.status(400).json({ error: 'Invalid category ID format' });
    }

    const camper = new Camper(req.body);
    await camper.validate();
    await camper.save();
    res.status(201).json(camper);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    next(error);
  }
});

// Obtaining all camers with filtering, pagination and sorting
export const getAllCampers = catchAsync(async (req, res) => {
  const {
    category,
    minPrice,
    maxPrice,
    minSleepingCapacity,
    maxSleepingCapacity,
    page = 1,
    limit = 10,
    sortBy = 'name',
    order = 'asc',
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

  // Sort settings
  const sortOptions = {};
  const sortOrder = order === 'desc' ? -1 : 1;

  if (sortBy === 'price' || sortBy === 'name') {
    sortOptions[sortBy] = sortOrder;
  } else {
    sortOptions['price'] = -1; // By default, we sort it from the high price to a low
  }

  const campers = await Camper.find(filter)
    .populate('category', 'name')
    .populate('reviews.user', 'name')
    .sort(sortOptions)
    .skip((page - 1) * limit)
    .limit(Number(limit));

  const total = await Camper.countDocuments(filter);

  res.json({
    campers,
    page: Number(page),
    limit: Number(limit),
    totalPages: Math.ceil(total / limit),
    totalItems: total,
  });
});

// Receiving cupers by ID
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

// Cemper update
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

// Removing the campers
export const deleteCamper = catchAsync(async (req, res, next) => {
  //? If the user sends the request with the invalid ID format, the server returns a 400 status code with the error message "Invalid camper ID format".

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'Invalid camper ID format' });
  }
  //? If the camper is not found, the server returns a 404 status code with the error message "Camper not found".
  const camper = await Camper.findByIdAndDelete(req.params.id);
  if (!camper) {
    return next({ statusCode: 404, message: 'Camper not found' });
  }

  res.status(204).end();
});
