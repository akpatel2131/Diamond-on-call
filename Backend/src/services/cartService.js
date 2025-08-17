const fs = require("fs");
const path = require("path");
const appError = require("../utils/appError");

const PURCHASE_FILE = path.join(__dirname, "../data/purchaseCart.json");
const SELL_FILE = path.join(__dirname, "../data/sellCart.json");

const readProductsFromFile = (type) => {
  const file = type === "purchase" ? PURCHASE_FILE : SELL_FILE;
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, JSON.stringify([], null, 2));
  }
  const data = fs.readFileSync(file, "utf-8");
  return JSON.parse(data);
};

const writeProductsToFile = (type, products) => {
    const file = type === "purchase" ? PURCHASE_FILE : SELL_FILE;
    fs.writeFileSync(file, JSON.stringify(products, null, 2));
};

const getCartItem = (type) => {
  try {
    const data = readProductsFromFile(type);

    let totalCost = data.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    if (type === "sell") {
      totalCost += totalCost * 0.2;
    }

    return {
      data,
      totalCost,
    };
  } catch (error) {
    throw appError(error, 500);
  }
};

const addPurchaseProduct = (productData) => {
  try {
    const products = readProductsFromFile("purchase");
    const product = products.find(
      (p) => Number(p.id) === Number(productData.id)
    );
    if (!product) {
      writeProductsToFile("purchase", [...products, productData]);
      return productData;
    }
    product.quantity = productData.quantity;

    writeProductsToFile("purchase", products);
    return productData;
  } catch (error) {
    throw appError(error, 500);
  }
};

const addSellProduct = (productData) => {
  const products = readProductsFromFile("sell");
  const product = products.find(
    (p) => Number(p.id) === Number(productData.id)
  );
  if (!product) {
    writeProductsToFile("sell", [...products, productData]);
    return productData;
  }

  if(product.stock < productData.quantity) {
    throw appError("Not enough stock", 400);
  }

  product.quantity = productData.quantity;
  writeProductsToFile("sell", products);
  return product;
};

const deleteCartItem = (productId, type) => {
  try {
    const products = readProductsFromFile(type);
    const product = products.filter((p) => Number(p.id) !== Number(productId));
    writeProductsToFile(type, product);
  } catch (error) {
    throw appError(error, 500);
  }
};

module.exports = {
  getCartItem,
  addPurchaseProduct,
  addSellProduct,
  deleteCartItem,
};
