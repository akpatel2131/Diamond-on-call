const cartService = require("../services/cartService");
const {errorMessage, successMessage} = require("../utils/message");

const getCartItem = (req, res) => {
  try {
    const { type, discount } = req.query;
    let products = cartService.getCartItem(type);

    if (type === "sell" && discount) {
      products.totalCost -= products.totalCost * (discount / 100);
    }

    res.status(200).json(successMessage({
      products: products.data,
      totalCost: products.totalCost,
      discount: products.discount,
    }));
  } catch (error) {
    res.status(error.statusCode).json(errorMessage(error.message));
  }
};

const createPurchaseCart = (req, res) => {
  try {
    const productData = req.body;
    const products = cartService.addPurchaseProduct(productData);
    res.status(201).json(successMessage({
      products,
    }));
  } catch (error) {
    res.status(error.statusCode).json(errorMessage(error.message));
  }
};

const createSellCart = (req, res) => {
  try {
    const productData = req.body;
    const products = cartService.addSellProduct(productData);
    res.status(201).json(successMessage({
      products,
    }));
  } catch (error) {
    res.status(error.statusCode).json(errorMessage(error.message));
  }
};

const deleteCartItem = (req, res) => {
  try {
    const { id } = req.params;
    const { type } = req.query;
    cartService.deleteCartItem(id, type);
    res.sendStatus(200);
  } catch (error) {
    res.status(error.statusCode).json(errorMessage(error.message));
  }
};

module.exports = {
  getCartItem,
  createPurchaseCart,
  createSellCart,
  deleteCartItem,
};
