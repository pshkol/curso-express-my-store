const Joi = require('joi');

const name = Joi.string();
const id = Joi.number().integer();
const lastName = Joi.string();
const phone = Joi.string();
const email = Joi.string();
const password = Joi.string();
const userId = Joi.number().integer();

const createCustomersSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phone: phone,
  user: Joi.object({
    email: email.required(),
    password: password.required(),
  })
})

const updateCustomersSchema = Joi.object({
  name: name,
  lastName: lastName,
  phone: phone,
  userId: userId,
})

const getCustomersSchema = Joi.object({
  id: id.required(),
})

module.exports = { createCustomersSchema, updateCustomersSchema, getCustomersSchema };
