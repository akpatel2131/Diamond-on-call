const express = require('express');
const router = express.Router();
const { getProducts, purchaseProduct, checkoutSale } = require('../controllers/productController');

router.get('/products', getProducts);
router.post('/purchase', purchaseProduct);
router.post('/sales/checkout', checkoutSale);

module.exports = router;
