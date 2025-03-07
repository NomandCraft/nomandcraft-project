import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { catchAsync } from '../utils/catchAsync.js';

export const registerUser = catchAsync(async (req, res) => {
  const { name, email, password, role } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res
      .status(400)
      .json({ error: 'User with this email already exists' });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });
  res.status(201).json({
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  });
});

export const getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});
