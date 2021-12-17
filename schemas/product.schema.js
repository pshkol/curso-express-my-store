const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);
const categoryId = Joi.number().integer();

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  categoryId: categoryId.required(),
})

const updateProductSchema = Joi.object({
  name: name,
  price: price,
  categoryId,
})

const getProductSchema = Joi.object({
  id: id.required(),
})

module.exports = { createProductSchema, updateProductSchema, getProductSchema };
