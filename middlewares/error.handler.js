function logErrors (error, req, res, next) {
  console.log('logErrors');
  // console.log(error);
  next(error);
}

function errorHandler (error, req, res, next) {
  console.log('errorHandler');
  res.json({
    message: error.message,
    stack: error.stack,
  });
}

function boomErrorHandler (error, req, res, next) {
  console.log('is boom')
  if (error.isBoom) {
    console.log('is boom2')
    const { output } = error;
    res.json(output.payload);
  }
  next(error);
}

module.exports = { logErrors, errorHandler, boomErrorHandler };
