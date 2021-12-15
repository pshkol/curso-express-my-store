const express = require('express');

const UsersService = require('../services/users.service');
const validatorHandler = require('../middlewares/validator.handler');
const { getUserSchema, createUserSchema} = require('../schemas/user.schema');

const router = express.Router();
const service = new UsersService();

router.get('/:id',
  validatorHandler(getUserSchema, 'params'),
  (req, res, next) => {
  try {
    res.json(service.getOne(req.params.id));
  } catch (error) {
    next(error);
  }
})

router.get('/', async (req, res, next) => {
  try {
    res.json(await service.getAll());
  } catch (error) {
    next(error);
  }
})

router.post('/',
  validatorHandler(createUserSchema, 'body'),
  (req, res, next) => {
  try {
    service.create(req.body.name, req.body.password);
    res.end();
  } catch (error) {
    next(error);
  }
})

router.patch('/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(createUserSchema, 'body'),
  (req, res, next) => {
  try {
    res.json(service.update(req.params.id, req.body));
  } catch (error) {
    next(error);
  }
})

router.delete('/:id',
  validatorHandler(getUserSchema, 'params'),
  (req, res, next) => {
  try {
    service.delete(req.params.id);
    res.end();
  } catch (error) {
    next(error);
  }
})

module.exports = router;
