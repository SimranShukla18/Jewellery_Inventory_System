const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Sample jewelry products data
let products = [
  {
    id: 1,
    name: 'Diamond Solitaire Ring',
    category: 'Rings',
    price: 2500,
    stock: 15,
    material: 'Gold',
    weight: '5g'
  },
  {
    id: 2,
    name: 'Pearl Necklace',
    category: 'Necklaces',
    price: 1800,
    stock: 8,
    material: 'Silver',
    weight: '12g'
  },
  {
    id: 3,
    name: 'Emerald Earrings',
    category: 'Earrings',
    price: 3200,
    stock: 12,
    material: 'Gold',
    weight: '8g'
  },
  {
    id: 4,
    name: 'Gold Chain Bracelet',
    category: 'Bracelets',
    price: 1500,
    stock: 20,
    material: 'Gold',
    weight: '15g'
  },
  {
    id: 5,
    name: 'Ruby Ring',
    category: 'Rings',
    price: 4500,
    stock: 6,
    material: 'Platinum',
    weight: '6g'
  },
  {
    id: 6,
    name: 'Silver Pendant',
    category: 'Necklaces',
    price: 850,
    stock: 25,
    material: 'Silver',
    weight: '7g'
  },
  {
    id: 7,
    name: 'Diamond Studs',
    category: 'Earrings',
    price: 5200,
    stock: 10,
    material: 'Platinum',
    weight: '4g'
  },
  {
    id: 8,
    name: 'Sapphire Bracelet',
    category: 'Bracelets',
    price: 3800,
    stock: 7,
    material: 'Gold',
    weight: '18g'
  },
  {
    id: 9,
    name: 'Gold Band Ring',
    category: 'Rings',
    price: 1200,
    stock: 30,
    material: 'Gold',
    weight: '4g'
  },
  {
    id: 10,
    name: 'Pearl Earrings',
    category: 'Earrings',
    price: 950,
    stock: 18,
    material: 'Silver',
    weight: '5g'
  },
  {
    id: 11,
    name: 'Diamond Necklace',
    category: 'Necklaces',
    price: 8500,
    stock: 5,
    material: 'Platinum',
    weight: '20g'
  },
  {
    id: 12,
    name: 'Silver Bangle',
    category: 'Bracelets',
    price: 680,
    stock: 35,
    material: 'Silver',
    weight: '25g'
  },
  {
    id: 13,
    name: 'Topaz Ring',
    category: 'Rings',
    price: 1650,
    stock: 14,
    material: 'Gold',
    weight: '5g'
  },
  {
    id: 14,
    name: 'Amethyst Pendant',
    category: 'Necklaces',
    price: 1150,
    stock: 22,
    material: 'Silver',
    weight: '8g'
  },
  {
    id: 15,
    name: 'Gold Hoops',
    category: 'Earrings',
    price: 2100,
    stock: 16,
    material: 'Gold',
    weight: '6g'
  }
];

// Routes

// GET all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// GET single product by ID
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
});

// POST create new product
app.post('/api/products', (req, res) => {
  const newProduct = {
    id: products.length + 1,
    ...req.body
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT update product
app.put('/api/products/:id', (req, res) => {
  const index = products.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }
  products[index] = { ...products[index], ...req.body };
  res.json(products[index]);
});

// DELETE product
app.delete('/api/products/:id', (req, res) => {
  const index = products.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }
  products.splice(index, 1);
  res.json({ message: 'Product deleted successfully' });
});

// GET products by category
app.get('/api/products/category/:category', (req, res) => {
  const categoryProducts = products.filter(
    p => p.category.toLowerCase() === req.params.category.toLowerCase()
  );
  res.json(categoryProducts);
});

// GET low stock products (stock < 10)
app.get('/api/products/status/low-stock', (req, res) => {
  const lowStockProducts = products.filter(p => p.stock < 10);
  res.json(lowStockProducts);
});

// GET inventory statistics
app.get('/api/stats', (req, res) => {
  const stats = {
    totalProducts: products.length,
    totalValue: products.reduce((sum, p) => sum + (p.price * p.stock), 0),
    avgPrice: products.reduce((sum, p) => sum + p.price, 0) / products.length,
    lowStockCount: products.filter(p => p.stock < 10).length,
    categories: [...new Set(products.map(p => p.category))],
    materials: [...new Set(products.map(p => p.material))]
  };
  res.json(stats);
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Jewelry Inventory Backend running on http://localhost:${PORT}`);
  console.log(`📊 API Endpoints:`);
  console.log(`   GET    http://localhost:${PORT}/api/products`);
  console.log(`   GET    http://localhost:${PORT}/api/products/:id`);
  console.log(`   POST   http://localhost:${PORT}/api/products`);
  console.log(`   PUT    http://localhost:${PORT}/api/products/:id`);
  console.log(`   DELETE http://localhost:${PORT}/api/products/:id`);
  console.log(`   GET    http://localhost:${PORT}/api/products/category/:category`);
  console.log(`   GET    http://localhost:${PORT}/api/products/status/low-stock`);
  console.log(`   GET    http://localhost:${PORT}/api/stats`);
});