exports.validateProduct = (req, res, next) => {
  const { name, price } = req.body;

  if (!name || typeof price !== 'number') {
    return res.status(400).json({ message: 'Invalid product data' });
  }

  next();
};
