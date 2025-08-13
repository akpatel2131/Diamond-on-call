const fs = require('fs');
const path = require('path');

const PRODUCTS_FILE = path.join(__dirname, '../data/products.json');

// Helper: Read products from file
const readProductsFromFile = () => {
  try {
    if (!fs.existsSync(PRODUCTS_FILE)) {
      fs.writeFileSync(PRODUCTS_FILE, JSON.stringify([], null, 2));
    }
    const data = fs.readFileSync(PRODUCTS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading products file:', err);
    return [];
  }
};

// Helper: Write products to file
const writeProductsToFile = (products) => {
  try {
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2));
  } catch (err) {
    console.error('Error writing products file:', err);
  }
};

// CRUD operations
const getAllProducts = () => {
  return readProductsFromFile();
};

const findProductById = (id) => {
  const products = readProductsFromFile();
  return products.find(p => p.id === id);
};

const increaseStock = (productId, quantity) => {
  const products = readProductsFromFile();
  const product = products.find(p => p.id === productId);
  if (!product) return null;
  product.stock += quantity;
  writeProductsToFile(products);
  return product;
};

const decreaseStock = (productId, quantity) => {
  const products = readProductsFromFile();
  const product = products.find(p => p.id === productId);
  if (!product) return null;
  if (product.stock < quantity) return false;
  product.stock -= quantity;
  writeProductsToFile(products);
  return product;
};

const calculateSalePrice = (product, quantity, discount) => {
  const basePrice = product.price * quantity;
  const markup = 0.20;
  const priceWithMarkup = basePrice * (1 + markup);
  const discountAmount = (priceWithMarkup * discount) / 100;
  const finalPrice = priceWithMarkup - discountAmount;

  return { basePrice, markup, priceWithMarkup, discountAmount, finalPrice };
};

module.exports = {
  getAllProducts,
  findProductById,
  increaseStock,
  decreaseStock,
  calculateSalePrice
};
  