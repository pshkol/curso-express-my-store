const {ValidationError} = require("sequelize");

function errorHandler (error, req, res, next) {
  res.json({
    message: error.message,
    stack: error.stack,
  });
}

function boomErrorHandler (error, req, res, next) {
  if (error.isBoom) {
    const { output } = error;
    res.json(output.payload);
  }
  next(error);
}

function sequelizeErrorHandler (error, req, res, next) {
  if (error instanceof ValidationError) {
    res.status(409).json({
      statusCode: 409,
      message: error.name,
      errors: error.errors,
    })
  }

  next(error);
}

module.exports = { errorHandler, boomErrorHandler, sequelizeErrorHandler };
