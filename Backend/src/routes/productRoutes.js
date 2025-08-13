const express = require('express');
const router = express.Router();
const { getProducts, purchaseProduct, checkoutSale } = require('../controllers/productController');
const validatePurchasePayload = require('../middleware/validatePurchasePayload');

router.get('/products', getProducts);
router.post('/purchase', validatePurchasePayload, purchaseProduct);
router.post('/sales/checkout', checkoutSale);

module.exports = router;