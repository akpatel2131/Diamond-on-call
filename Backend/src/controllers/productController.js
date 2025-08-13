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
    const { productId, quantity } = req.body;
    if (!productId || !quantity || quantity <= 0) {
      return res.status(400).json({ success: false, message: 'Product ID and valid quantity are required' });
    }

    const product = productService.increaseStock(productId, parseInt(quantity));
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

    const totalCost = product.price * quantity;
    res.status(200).json({
      success: true,
      message: 'Purchase successful',
      data: { product, quantity, totalCost, updatedStock: product.stock }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Purchase failed', error: err.message });
  }
};

const checkoutSale = (req, res) => {
  try {
    const { productId, quantity, discount = 0 } = req.body;
    if (!productId || !quantity || quantity <= 0) {
      return res.status(400).json({ success: false, message: 'Product ID and valid quantity are required' });
    }
    if (discount < 0 || discount > 100) {
      return res.status(400).json({ success: false, message: 'Discount must be between 0 and 100' });
    }

    const product = productService.findProductById(productId);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

    const updatedProduct = productService.decreaseStock(productId, parseInt(quantity));
    if (updatedProduct === false) {
      return res.status(400).json({ success: false, message: `Insufficient stock. Available: ${product.stock}` });
    }

    const prices = productService.calculateSalePrice(product, quantity, discount);
    res.status(200).json({
      success: true,
      message: 'Sale completed successfully',
      data: { product, quantity, ...prices, discount: `${discount}%`, updatedStock: product.stock }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Sale checkout failed', error: err.message });
  }
};

module.exports = { getProducts, purchaseProduct, checkoutSale };
