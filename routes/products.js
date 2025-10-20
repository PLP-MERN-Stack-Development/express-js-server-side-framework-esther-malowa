// routes/products.js
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const ValidationError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFoundError');
const validateProduct = require('../middleware/validateProduct');

const router = express.Router();

// In-memory products database
let products = [
  { id: '1', name: 'Laptop', description: 'High-performance laptop', price: 1200, category: 'electronics', inStock: true },
  { id: '2', name: 'Smartphone', description: '128GB model', price: 800, category: 'electronics', inStock: true },
  { id: '3', name: 'Coffee Maker', description: 'Programmable coffee maker', price: 50, category: 'kitchen', inStock: false },
];

// 📍 GET /api/products (with filtering, pagination, search)
router.get('/', (req, res) => {
  let { category, search, page = 1, limit = 5 } = req.query;
  page = parseInt(page);
  limit = parseInt(limit);

  let results = [...products];

  // Filter by category
  if (category) results = results.filter(p => p.category === category.toLowerCase());

  // Search by name
  if (search) results = results.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  // Pagination
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginated = results.slice(start, end);

  res.json({
    page,
    total: results.length,
    results: paginated
  });
});

// 📍 GET /api/products/:id
router.get('/:id', (req, res, next) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return next(new NotFoundError('Product not found'));
  res.json(product);
});

// 📍 POST /api/products
router.post('/', validateProduct, (req, res) => {
  const newProduct = { id: uuidv4(), ...req.body };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// 📍 PUT /api/products/:id
router.put('/:id', validateProduct, (req, res, next) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return next(new NotFoundError('Product not found'));
  products[index] = { ...products[index], ...req.body };
  res.json(products[index]);
});

// 📍 DELETE /api/products/:id
router.delete('/:id', (req, res, next) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return next(new NotFoundError('Product not found'));
  const deleted = products.splice(index, 1);
  res.json({ message: 'Product deleted successfully', product: deleted[0] });
});

// 📊 GET /api/products/stats - Count products by category
router.get('/stats/count', (req, res) => {
  const stats = {};
  products.forEach(p => {
    stats[p.category] = (stats[p.category] || 0) + 1;
  });
  res.json(stats);
});

module.exports = router;
