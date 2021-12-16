const express = require('express');

const CustomersService = require('../services/customers.service');
const validatorHandler = require("../middlewares/validator.handler");
const { getCustomersSchema, createCustomersSchema, updateCustomersSchema } = require("../schemas/customers.schema");

const router = express.Router();
const service = new CustomersService()

router.get('/:id',
  validatorHandler(getCustomersSchema, 'params'),
  async (req, res, next) => {
  try {
    res.json(await service.getOne(req.params.id));
  } catch (e) {
    next(e);
  }
})

router.get('/', async (req, res, next) => {
  try {
    res.json(await service.getAll());
  } catch (e) {
    next(e);
  }
})

router.post('/',
  validatorHandler(createCustomersSchema, 'body'),
  async (req, res, next) => {
  try {
    res.json(await service.create(req.body));
  } catch (e) {
    next(e);
  }
})

router.patch('/:id',
  validatorHandler(updateCustomersSchema, 'body'),
  validatorHandler(getCustomersSchema, 'params'),
  async (req, res, next) => {
  try {
    res.json(await service.update(req.params.id, req.body));
  } catch (e) {
    next(e);
  }
})

router.delete('/:id',
  validatorHandler(getCustomersSchema, 'params'),
  async (req, res, next) => {
  try {
    res.json(await service.delete(req.params.id));
  } catch (e) {
    next(e);
  }
})

module.exports = router;
