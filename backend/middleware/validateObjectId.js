import mongoose from 'mongoose';

export const validateObjectId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    const error = new Error('Invalid ID format');
    error.statusCode = 400;
    return next(error);
  }
  next();
};

export default validateObjectId;
