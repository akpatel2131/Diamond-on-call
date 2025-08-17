const fs = require("fs");
const path = require("path");
const appError = require("../utils/appError");

const PRODUCTS_FILE = path.join(__dirname, "../data/products.json");
const PURCHASE_FILE = path.join(__dirname, "../data/purchaseCart.json");
const SELL_FILE = path.join(__dirname, "../data/sellCart.json");

const readProductsFromFile = () => {
  if (!fs.existsSync(PRODUCTS_FILE)) {
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify([], null, 2));
  }
  const data = fs.readFileSync(PRODUCTS_FILE, "utf-8");
  return JSON.parse(data);
};

const writeProductsToFile = (file, products) => {
  fs.writeFileSync(file, JSON.stringify(products, null, 2));
};

const getAllProducts = () => {
  return readProductsFromFile();
};

const increaseStock = (productId, quantity) => {
  const products = readProductsFromFile();
  console.log("print product")
  const product = products.find((p) => Number(p.id) === Number(productId));
  console.log({product})
  if (!product) throw appError("Product not found", 404);
  product.stock += quantity;
  console.log("print product 2")
  writeProductsToFile(PRODUCTS_FILE, products);
  console.log("print product 3")
  writeProductsToFile(PURCHASE_FILE, []);
  console.log("print product 4")
  return product;
};

const decreaseStock = (productId, quantity) => {
  const products = readProductsFromFile();
  const product = products.find((p) => Number(p.id) === Number(productId));
  if (!product) throw appError("Product not found", 404);
  if (product.stock < quantity) throw appError("Not enough stock", 400);
  product.stock -= quantity;
  writeProductsToFile(PRODUCTS_FILE, products);
  writeProductsToFile(SELL_FILE, []);
  return product;
};

const calculateSalePrice = (product, quantity, discount) => {
  try {
    const basePrice = product.price * quantity;
    const markup = 0.2;
    const priceWithMarkup = basePrice * (1 + markup);
    const discountAmount = (priceWithMarkup * discount) / 100;
    const finalPrice = priceWithMarkup - discountAmount;

    return { basePrice, markup, priceWithMarkup, discountAmount, finalPrice };
  } catch (error) {
    throw appError(error, 500);
  }
};

module.exports = {
  getAllProducts,
  increaseStock,
  decreaseStock,
  calculateSalePrice,
};
