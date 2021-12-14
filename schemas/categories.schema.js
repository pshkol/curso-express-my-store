const Joi = require('joi');

const name = Joi.string();
const id = Joi.string();

const createCategorySchema = Joi.object({
  name: name.required(),
})

const getCategorySchema = Joi.object({
  id: id.required(),
})

module.exports = { createCategorySchema, getCategorySchema };
