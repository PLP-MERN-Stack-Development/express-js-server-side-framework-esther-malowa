// middleware/validateProduct.js
const ValidationError = require('../errors/ValidationError');

module.exports = (req, res, next) => {
  const { name, description, price, category, inStock } = req.body;

  if (!name || !description || price == null || !category || typeof inStock !== 'boolean') {
    return next(new ValidationError('All product fields (name, description, price, category, inStock) are required.'));
  }

  if (typeof price !== 'number' || price < 0) {
    return next(new ValidationError('Price must be a positive number.'));
  }

  next();
};
