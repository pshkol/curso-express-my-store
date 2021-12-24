const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);
const categoryId = Joi.number().integer();
const limit = Joi.number().integer();
const offset = Joi.number().integer();
const priceMin = Joi.number().integer();
const priceMax = Joi.number().integer();

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

const queryProductSchema = Joi.object({
  offset: offset,
  limit: limit,
  price: price,
  price_min: priceMin,
  price_max: priceMax.when('price_min', {
    is: Joi.number().integer(),
    then: Joi.required(),
  })
})

module.exports = { createProductSchema, updateProductSchema, getProductSchema, queryProductSchema };
