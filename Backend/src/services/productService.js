const fs = require('fs');
const path = require('path');

const PRODUCTS_FILE = path.join(__dirname, '../data/products.json');

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

const writeProductsToFile = (products) => {
  try {
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2));
  } catch (err) {
    console.error('Error writing products file:', err);
  }
};

const getAllProducts = () => {
  return readProductsFromFile();
};

const increaseStock = (productId, quantity) => {
  const products = readProductsFromFile();
  const product = products.find(p => Number(p.id) === Number(productId));
  if (!product) return null;
  product.stock += quantity;
  writeProductsToFile(products);
  return product;
};

const decreaseStock = (productId, quantity) => {
  const products = readProductsFromFile();
  const product = products.find(p => Number(p.id) === Number(productId));
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
  increaseStock,
  decreaseStock,
  calculateSalePrice
};
  