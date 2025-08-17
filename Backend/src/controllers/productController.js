// controllers/productController.js
const productService = require("../services/productService");
const { errorMessage, successMessage } = require("../utils/message");

const getProducts = (req, res) => {
  try {
    const products = productService.getAllProducts();
    res.status(200).json(successMessage(products));
  } catch (err) {
    res.status(err.statusCode).json(errorMessage(err.message));
  }
};

const purchaseProduct = (req, res) => {
  try {
    const productData = req.body;
    const products = productData.map((item) =>
      productService.increaseStock(item.id, parseInt(item.quantity))
    );

    const totalCost = productData.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    res.status(201).json(
      successMessage({
        products,
        totalCost,
      })
    );
  } catch (err) {
    res.status(err.statusCode).json(errorMessage(err.message));
  }
};

const checkoutSale = (req, res) => {
  try {
    const { productData, discount } = req.body;

    const products = productData.map((item) =>
      productService.decreaseStock(item.id, parseInt(item.quantity))
    );

    const sellPrices = productData.map((item) =>
      productService.calculateSalePrice(item, parseInt(item.quantity), discount)
    );

    res.status(201).json(
      successMessage({
        products,
        sellPrices,
      })
    );
  } catch (err) {
    res.status(err.statusCode).json(errorMessage(err.message));
  }
};

module.exports = { getProducts, purchaseProduct, checkoutSale };
