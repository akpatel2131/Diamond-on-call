const Joi = require("joi");

const sellSchema = Joi.object({
  productData: Joi.array().items(
    Joi.object({
      id: Joi.number().required(),
      name: Joi.string().required(),
      price: Joi.number().required(),
      quantity: Joi.number().required(),
      stock: Joi.number().required(),
    })
  ),
  discount: Joi.number().required(),
});

const validateSellPayload = (req, res, next) => {
  const { error, value } = sellSchema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });
  }
  req.body = value;
  next();
};

module.exports = validateSellPayload;
