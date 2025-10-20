// middleware/errorHandler.js
module.exports = (err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    error: err.name,
    message: err.message || 'Internal Server Error',
  });
};
