// server.js - Complete Express API for Week 2 Assignment

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

// Initialize app
const app = express();
const PORT = process.env.PORT || 3000;

// ===== Middleware =====

// JSON parser
app.use(bodyParser.json());

// Custom logger middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Authentication middleware (check for API key)
app.use((req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(401).json({ error: 'Unauthorized: Missing or invalid API key' });
  }
  next();
});

// ===== In-memory data =====
let products = [
  {
    id: '1',
    name: 'Laptop',
    description: 'High-performance laptop with 16GB RAM',
    price: 1200,
    category: 'electronics',
    inStock: true
  },
  {
    id: '2',
    name: 'Smartphone',
    description: 'Latest model with 128GB storage',
    price: 800,
    category: 'electronics',
    inStock: true
  },
  {
    id: '3',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with timer',
    price: 50,
    category: 'kitchen',
    inStock: false
  }
];

// ===== Helper validation function =====
function validateProduct(product) {
  const { name, description, price, category, inStock } = product;
  if (!name || !description || price == null || !category || typeof inStock !== 'boolean') {
    return 'All fields (name, description, price, category, inStock) are required.';
  }
  if (typeof price !== 'number' || price < 0) {
    return 'Price must be a positive number.';
  }
  return null;
}

// ===== Routes =====

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Product API! Go to /api/products to see all products.');
});

// GET /api/products - List all products (with filtering, pagination, search)
app.get('/api/products', (req, res) => {
  let { category, search, page = 1, limit = 5 } = req.query;
  page = parseInt(page);
  limit = parseInt(limit);

  let filtered = [...products];

  if (category) filtered = filtered.filter(p => p.category.toLowerCase() === category.toLowerCase());
  if (search) filtered = filtered.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  const start = (page - 1) * limit;
  const end = start + limit;
  const paginated = filtered.slice(start, end);

  res.json({
    page,
    total: filtered.length,
    results: paginated
  });
});

// GET /api/products/:id - Get product by ID
app.get('/api/products/:id', (req, res, next) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    const err = new Error('Product not found');
    err.status = 404;
    return next(err);
  }
  res.json(product);
});

// POST /api/products - Create product
app.post('/api/products', (req, res, next) => {
  const errorMsg = validateProduct(req.body);
  if (errorMsg) {
    const err = new Error(errorMsg);
    err.status = 400;
    return next(err);
  }

  const newProduct = { id: uuidv4(), ...req.body };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT /api/products/:id - Update product
app.put('/api/products/:id', (req, res, next) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    const err = new Error('Product not found');
    err.status = 404;
    return next(err);
  }

  const errorMsg = validateProduct(req.body);
  if (errorMsg) {
    const err = new Error(errorMsg);
    err.status = 400;
    return next(err);
  }

  products[index] = { ...products[index], ...req.body };
  res.json(products[index]);
});

// DELETE /api/products/:id - Delete product
app.delete('/api/products/:id', (req, res, next) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    const err = new Error('Product not found');
    err.status = 404;
    return next(err);
  }

  const deleted = products.splice(index, 1);
  res.json({ message: 'Product deleted successfully', product: deleted[0] });
});

// GET /api/products/stats - Count by category
app.get('/api/products/stats/count', (req, res) => {
  const stats = {};
  products.forEach(p => {
    stats[p.category] = (stats[p.category] || 0) + 1;
  });
  res.json(stats);
});

// ===== Global Error Handling =====
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
});

// ===== Start Server =====
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
