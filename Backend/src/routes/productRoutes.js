const express = require("express");
const router = express.Router();
const {
  getProducts,
  purchaseProduct,
  checkoutSale,
} = require("../controllers/productController");
const validatePurchasePayload = require("../middleware/validatePurchasePayload");
const validateSellPayload = require("../middleware/validateSellsPayload");
const validateCartPayload = require("../middleware/cartPayload");
const {
  getCartItem,
  createPurchaseCart,
  createSellCart,
  deleteCartItem
} = require("../controllers/cartController");

router.get("/products", getProducts);
router.post("/purchase", validatePurchasePayload, purchaseProduct);
router.post("/sales/checkout", validateSellPayload, checkoutSale);
router.post("/purchase/cart", createPurchaseCart);
router.post("/sell/cart", createSellCart);

router.get("/cart", getCartItem);
router.post("/cart/sell", validateCartPayload, createSellCart);
router.post("/cart/purchase", validateCartPayload, createPurchaseCart);
router.delete("/cart/:id", deleteCartItem);

module.exports = router;
