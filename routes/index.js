const express = require('express');
const productsRouter = require('./products.router');
const usersRouter = require('./users.router');
const categoriesRouter = require('./categories.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);

  router.use('/products', productsRouter);
  router.use('/users', usersRouter);
  router.use('/categories', categoriesRouter);

  router.get('/', (req, res) => {
    res.send('Hola mi server en Express');
  });

  router.get('/nueva-ruta', (req, res) => {
    res.send('Hola, soy una nueva ruta');
  })
}

module.exports = routerApi;
