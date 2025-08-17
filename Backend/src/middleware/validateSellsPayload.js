const Joi = require("joi");
const { errorMessage } = require("../utils/message");

const sellSchema = Joi.object({
  productData: Joi.array().items(
    Joi.object({
      id: Joi.number().required("product Id is missing"),
      name: Joi.string().required("Product name is missing"),
      price: Joi.number().required("Product price is missing"),
      quantity: Joi.number().required("Product quantity is missing"),
      stock: Joi.number().required("Product stock is missing"),
    })
  ),
  discount: Joi.number().required(),
});

const validateSellPayload = (req, res, next) => {
  const { error, value } = sellSchema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json(errorMessage(error.details[0].message));
  }
  req.body = value;
  next();
};

module.exports = validateSellPayload;
