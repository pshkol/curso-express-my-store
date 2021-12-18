const express = require('express');

const validatorHandler = require("../middlewares/validator.handler");
const {getOrderSchema, createOrderSchema, updateOrderSchema} = require("../schemas/order.schema");
const OrderService = require("../services/orders.service");
const {createOrderProductSchema} = require("../schemas/order-product.schema");

const router = express.Router();
const service = new OrderService();

router.get('/', async (req, res, next) => {
  try {
    res.json(await service.getAll());
  } catch (e) {
    next(e);
  }
})

router.get('/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      res.json(await service.getOne(req.params.id));
    } catch (e) {
      next(e);
    }
  }
)

router.post('/',
  validatorHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      res.json(await service.create(req.body));
    } catch (e) {
      next(e);
    }
  }
)

router.patch('/:id',
  validatorHandler(getOrderSchema, 'params'),
  validatorHandler(updateOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      res.json(await service.update(req.params.id, req.body));
    } catch (e) {
      next(e);
    }
  }
)

router.delete('/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      res.json(await service.delete(req.params.id));
    } catch (e) {
      next(e);
    }
  }
)

router.post('/add-item',
  validatorHandler(createOrderProductSchema, 'body'),
  async (req, res, next) => {
    try {
      res.json(await service.createOrderProduct(req.body));
    } catch (e) {
      next(e);
    }
  }
)

module.exports = router;
