const express = require('express');
const boom = require('@hapi/boom');

const CategoriesService = require('../services/categories.service');
const validateHandler = require('../middlewares/validator.handler');
const { createCategorySchema, getCategorySchema } = require('../schemas/categories.schema');

const router = express.Router();
const service = new CategoriesService();

router.get('/:id',
  validateHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
  try {
    const category = await service.getOne(req.params.id);
    res.json(category);
  } catch (error) {
    next(error);
  }
})

router.get('/', async (req, res, next) => {
  const categories = await service.getAll();
  res.json(categories);
})

router.post('/',
  validateHandler(createCategorySchema, 'body'),
  async (req, res, next) => {
  try {
    const newCategory = await service.create(req.body);
    res.json(newCategory);
  } catch (error) {
    next(error);
  }
})

router.patch('/:id',
  validateHandler(getCategorySchema,'params'),
  validateHandler(createCategorySchema, 'body'),
  async (req, res, next) => {
  try {
    res.json(await service.update(req.params.id, req.body))
  } catch (error) {
    next(error);
  }
})

router.delete('/:id',
  validateHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
  try {
    res.json(await service.delete(req.params.id));
  } catch (error) {
    next(error);
  }
})

module.exports = router;
