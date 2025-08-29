import mongoose from 'mongoose';

export const validateObjectId = (req, res, next) => {
  // Проверяем все значения из req.params
  const invalid = Object.values(req.params).find(
    (val) => !mongoose.Types.ObjectId.isValid(val)
  );

  if (invalid) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }
  next();
};
