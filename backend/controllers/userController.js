import mongoose from 'mongoose';
import User from '../models/user.js';
import catchAsync from '../utils/catchAsync.js';

const { isValidObjectId } = mongoose;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// POST /api/users/register
export const registerUser = catchAsync(async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ error: 'name, email and password are required' });
  }
  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }
  if (String(password).length < 6) {
    return res
      .status(400)
      .json({ error: 'Password must be at least 6 characters' });
  }

  const exists = await User.exists({ email: email.toLowerCase().trim() });
  if (exists) {
    return res
      .status(400)
      .json({ error: 'User with this email already exists' });
  }

  // Хеширование произойдёт в pre('save') модели User
  const user = await User.create({ name, email, password, role });

  res.status(201).json({
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
  });
});

// GET /api/users
export const getAllUsers = catchAsync(async (req, res) => {
  const page = Math.max(1, Number.parseInt(req.query.page, 10) || 1);
  const limit = Math.min(
    100,
    Math.max(1, Number.parseInt(req.query.limit, 10) || 20)
  );
  const skip = (page - 1) * limit;

  const [users, total] = await Promise.all([
    User.find()
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    User.countDocuments(),
  ]);

  res.json({
    users,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    totalItems: total,
  });
});

// GET /api/users/:id
export const getUserById = catchAsync(async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return res.status(400).json({ error: 'Invalid user ID format' });
  }
  const user = await User.findById(id).select('-password').lean();
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});
