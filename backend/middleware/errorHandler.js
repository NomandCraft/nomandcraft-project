export default (err, req, res) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // Обработка ошибки валидации Mongoose
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((el) => el.message)
      .join(', ');
  }

  res.status(statusCode).json({
    error: message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};
