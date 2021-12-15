const express = require('express');

const routerApi = require('./routes');
const { errorHandler, boomErrorHandler, sequelizeErrorHandler } = require('./middlewares/error.handler');

const app = express();
const port = 3050;

app.use(express.json());
routerApi(app);

app.use(sequelizeErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`My port: ${port}`);
});
