const express = require('express');
const boom = require('@hapi/boom');

const CategoriesService = require('../services/categories.service');
const validateHandler = require('../middlewares/validator.handler');
const { createCategorySchema, getCategorySchema } = require('../schemas/categories.schema');

const router = express.Router();
const service = new CategoriesService();

router.get('/:id',
  validateHandler(getCategorySchema, 'params'),
  (req, res, next) => {
  try {
    const category = service.getOne(req.params.id);

    res.json(category);
  } catch (error) {
    next(error);
  }
})

router.get('/', (req, res, next) => {
  const categories = service.getAll();

  res.json(categories);
})

router.post('/',
  validateHandler(createCategorySchema, 'body'),
  (req, res, next) => {
  try {
    if (!req.body.name) {
      throw new boom.badRequest('falta el parametro name');
    }
    service.create(req.body.name);
    res.end();
  } catch (error) {
    next(error);
  }
})

router.patch('/:id',
  validateHandler(getCategorySchema,'params'),
  validateHandler(createCategorySchema, 'body'),
  (req, res, next) => {
  try {
    if (!req.body.name) {
      throw new boom.badRequest('falta el nombre');
    }

    res.json(service.update(req.params.id, req.body.name))
  } catch (error) {
    next(error);
  }
})

router.delete('/:id',
  validateHandler(getCategorySchema, 'params'),
  (req, res, next) => {
  try {
    service.delete(req.params.id);
    res.end();
  } catch (error) {
    next(error);
  }
})

module.exports = router;
