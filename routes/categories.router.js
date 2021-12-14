const express = require('express');
const router = express.Router();
const boom = require('@hapi/boom');

const CategoriesService = require('../services/categories.service');

const service = new CategoriesService();

router.get('/', (req, res, next) => {
  const categories = service.getAll();

  res.json(categories);
})

router.post('/', (req, res, next) => {
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

router.patch('/:id', (req, res, next) => {
  try {
    if (!req.body.name) {
      throw new boom.badRequest('falta el nombre');
    }

    res.json(service.update(req.params.id, req.body.name))
  } catch (error) {
    next(error);
  }
})

router.delete('/:id', (req, res, next) => {
  try {
    service.delete(req.params.id);
    res.end();
  } catch (error) {
    next(error);
  }
})

module.exports = router;
