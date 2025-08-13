// controllers/productController.js
const productService = require('../services/productService');

const getProducts = (req, res) => {
  try {
    const products = productService.getAllProducts();
    res.status(200).json({ success: true, data: products });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch products', error: err.message });
  }
};

const purchaseProduct = (req, res) => {
  try {
    const productData = req.body;
    const products = productData.map((item) => productService.increaseStock(item.id, parseInt(item.quantity)));

    const totalCost = productData.reduce((total, item) => total + item.price * item.quantity, 0);

    res.status(201).json({
      success: true,
      message: 'Purchase successful',
      data: {
        products,
        totalCost
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Purchase failed', error: err.message });
  }
};

const checkoutSale = (req, res) => {
  try {
    const {productData, discount} = req.body;

    const products = productData.map((item) => productService.decreaseStock(item.id, parseInt(item.quantity)));

    if (products.includes(false)) {
      return res.status(400).json({ success: false, message: `Insufficient stock` });
    }

    const sellPrices = productData.map((item) => productService.calculateSalePrice(item, parseInt(item.quantity), discount));
    res.status(201).json({
      success: true,
      message: 'Sale completed successfully',
      data: { 
        products,
        sellPrices
       }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Sale checkout failed', error: err.message });
  }
};

module.exports = { getProducts, purchaseProduct, checkoutSale };
