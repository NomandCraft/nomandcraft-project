import mongoose from 'mongoose';
import Camper from '../models/camper.js';
import Category from '../models/category.js';
import catchAsync from '../utils/catchAsync.js';

const { isValidObjectId } = mongoose;

const ALLOWED_SORT = new Set([
  'name',
  'price',
  'createdAt',
  'sleepingCapacity',
]);
const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 100;

function toNumberSafe(v, fallback = undefined) {
  if (v === undefined) return fallback;
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}
function pick(obj, fields = []) {
  return fields.reduce((acc, k) => {
    if (Object.prototype.hasOwnProperty.call(obj, k)) acc[k] = obj[k];
    return acc;
  }, {});
}

// POST /api/campers
export const createCamper = catchAsync(async (req, res) => {
  // в body разрешим только известные поля
  const allowed = [
    'name',
    'images',
    'category',
    'sleepingCapacity',
    'price',
    'isCustomizable',
    'productionTime',
    'customFeatures',
    'description',
    'features',
    'status',
    'reviews',
  ];
  const data = pick(req.body, allowed);

  // валидация category
  if (!data.category || !isValidObjectId(data.category)) {
    return res.status(400).json({ error: 'Invalid or missing category ID' });
  }
  const catExists = await Category.exists({ _id: data.category });
  if (!catExists) {
    return res.status(400).json({ error: 'Category not found' });
  }

  try {
    const camper = await Camper.create(data);
    // populate, чтобы сразу вернуть название категории
    const populated = await Camper.findById(camper._id)
      .populate('category', 'name slug')
      .populate('reviews.user', 'name')
      .lean();
    return res.status(201).json(populated);
  } catch (error) {
    if (error?.code === 11000) {
      return res
        .status(409)
        .json({ error: 'Duplicate key', details: error.keyValue });
    }
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    throw error;
  }
});

// GET /api/campers
// поддержка фильтров: category, minPrice, maxPrice, minSleepingCapacity, maxSleepingCapacity, status, isCustomizable, q
export const getAllCampers = catchAsync(async (req, res) => {
  const {
    category,
    minPrice,
    maxPrice,
    minSleepingCapacity,
    maxSleepingCapacity,
    status,
    isCustomizable,
    q,
    page = 1,
    limit = DEFAULT_LIMIT,
    sortBy = 'name',
    order = 'asc',
    select,
  } = req.query;

  // фильтр
  const filter = {};

  if (category) {
    if (!isValidObjectId(category)) {
      return res.status(400).json({ error: 'Invalid category ID format' });
    }
    filter.category = new mongoose.Types.ObjectId(category);
  }

  const minP = toNumberSafe(minPrice);
  const maxP = toNumberSafe(maxPrice);
  if (minP != null || maxP != null) {
    filter.price = {};
    if (minP != null) filter.price.$gte = minP;
    if (maxP != null) filter.price.$lte = maxP;
    if (minP != null && maxP != null && minP > maxP) {
      return res
        .status(400)
        .json({ error: 'minPrice cannot be greater than maxPrice' });
    }
  }

  const minSC = toNumberSafe(minSleepingCapacity);
  const maxSC = toNumberSafe(maxSleepingCapacity);
  if (minSC != null || maxSC != null) {
    filter.sleepingCapacity = {};
    if (minSC != null) filter.sleepingCapacity.$gte = minSC;
    if (maxSC != null) filter.sleepingCapacity.$lte = maxSC;
    if (minSC != null && maxSC != null && minSC > maxSC) {
      return res.status(400).json({
        error: 'minSleepingCapacity cannot be greater than maxSleepingCapacity',
      });
    }
  }

  if (status) filter.status = status;
  if (isCustomizable != null)
    filter.isCustomizable = String(isCustomizable) === 'true';

  if (q) {
    // использует текстовый индекс в модели (name/description/features)
    filter.$text = { $search: q };
  }

  // сортировка
  const sortOptions = {};
  const sortOrder = order === 'desc' ? -1 : 1;
  const sortField = ALLOWED_SORT.has(sortBy) ? sortBy : 'price';
  sortOptions[sortField] = sortOrder;

  // пагинация/лимит
  const pageNum = Math.max(1, toNumberSafe(page, 1));
  const limitNum = Math.min(
    MAX_LIMIT,
    Math.max(1, toNumberSafe(limit, DEFAULT_LIMIT))
  );
  const skip = (pageNum - 1) * limitNum;

  // выбор полей
  let projection = undefined;
  if (select) {
    // ?select=name,price,slug
    projection = String(select)
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
      .join(' ');
  }

  const [items, total] = await Promise.all([
    Camper.find(filter, projection)
      .populate('category', 'name slug')
      .populate('reviews.user', 'name')
      .sort(sortOptions)
      .skip(skip)
      .limit(limitNum)
      .lean(),
    Camper.countDocuments(filter),
  ]);

  res.json({
    campers: items,
    page: pageNum,
    limit: limitNum,
    totalPages: Math.ceil(total / limitNum),
    totalItems: total,
    sort: { by: sortField, order: sortOrder === 1 ? 'asc' : 'desc' },
    query: { q: q || undefined },
  });
});

// GET /api/campers/:id
export const getCamperById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(400).json({ error: 'Invalid camper ID format' });
  }

  const camper = await Camper.findById(id)
    .populate('category', 'name slug')
    .populate('reviews.user', 'name')
    .lean();

  if (!camper) {
    return next({ statusCode: 404, message: 'Camper not found' });
  }
  res.json(camper);
});

// PATCH /api/campers/:id
export const updateCamper = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(400).json({ error: 'Invalid camper ID format' });
  }

  const allowed = [
    'name',
    'images',
    'category',
    'sleepingCapacity',
    'price',
    'isCustomizable',
    'productionTime',
    'customFeatures',
    'description',
    'features',
    'status',
  ];
  const data = pick(req.body, allowed);

  if (data.category && !isValidObjectId(data.category)) {
    return res.status(400).json({ error: 'Invalid category ID format' });
  }
  if (data.category) {
    const catExists = await Category.exists({ _id: data.category });
    if (!catExists)
      return res.status(400).json({ error: 'Category not found' });
  }

  try {
    const camper = await Camper.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    })
      .populate('category', 'name slug')
      .populate('reviews.user', 'name')
      .lean();

    if (!camper) {
      return next({ statusCode: 404, message: 'Camper not found' });
    }
    res.json(camper);
  } catch (error) {
    if (error?.code === 11000) {
      return res
        .status(409)
        .json({ error: 'Duplicate key', details: error.keyValue });
    }
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    throw error;
  }
});

// DELETE /api/campers/:id
export const deleteCamper = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(400).json({ error: 'Invalid camper ID format' });
  }

  const camper = await Camper.findByIdAndDelete(id);
  if (!camper) {
    return next({ statusCode: 404, message: 'Camper not found' });
  }
  res.status(204).end();
});
