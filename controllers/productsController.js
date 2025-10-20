const { v4: uuidv4 } = require('uuid');

// Sample data
let products = [
  { id: '1', name: 'Laptop', description: 'High-performance laptop', price: 1200, category: 'electronics', inStock: true },
  { id: '2', name: 'Smartphone', description: 'Latest smartphone', price: 800, category: 'electronics', inStock: true },
  { id: '3', name: 'Coffee Maker', description: 'Programmable coffee maker', price: 50, category: 'kitchen', inStock: false },
];

// GET all products
exports.getAllProducts = (req, res) => {
  res.json(products);
};

// GET product by ID
exports.getProductById = (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
};

// POST create new product
exports.createProduct = (req, res) => {
  const { name, description, price, category, inStock } = req.body;
  const newProduct = { id: uuidv4(), name, description, price, category, inStock };
  products.push(newProduct);
  res.status(201).json(newProduct);
};

// PUT update product
exports.updateProduct = (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });

  Object.assign(product, req.body);
  res.json(product);
};

// DELETE product
exports.deleteProduct = (req, res) => {
  products = products.filter(p => p.id !== req.params.id);
  res.json({ message: 'Product deleted successfully' });
};

// SEARCH products
exports.searchProducts = (req, res) => {
  const query = req.query.q?.toLowerCase() || '';
  const results = products.filter(p =>
    p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query)
  );
  res.json(results);
};

// GET product stats
exports.getProductStats = (req, res) => {
  const total = products.length;
  const inStockCount = products.filter(p => p.inStock).length;
  const outOfStockCount = total - inStockCount;

  res.json({
    totalProducts: total,
    inStock: inStockCount,
    outOfStock: outOfStockCount
  });
};
