const productsRouter = require('./products.router');
const usersRouter = require('./users.router');
const categoriesRouter = require('./categories.router');

function routerApi(app) {
  app.use('/products', productsRouter);
  app.use('/users', usersRouter);
  app.use('/categories', categoriesRouter);

  app.get('/', (req, res) => {
    res.send('Hola mi server en Express');
  });

  app.get('/nueva-ruta', (req, res) => {
    res.send('Hola, soy una nueva ruta');
  })
}

module.exports = routerApi;
