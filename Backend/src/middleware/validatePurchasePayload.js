const Joi = require('joi');

const purchaseSchema = Joi.object({
  id: Joi.number().integer().required(),
  name: Joi.string().required(),
  price: Joi.number().required(),
  quantity: Joi.number().required(),
  stock: Joi.number().required(),
});

const validatePurchasePayload = (req, res, next) => {
  const { error, value } = purchaseSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: error.details[0].message });
  }
  req.body = value;
  next();
};

module.exports = validatePurchasePayload;