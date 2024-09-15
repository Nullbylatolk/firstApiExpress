//middlewere de tipo error
function logErrors(err, req, res, next) {
  console.log('logErrors')
  console.error(err)
  next(err)
}

function errorHandler(err, req, res, next) {
  console.log('errorHandler')
  res.status(500).send(
    {
      message: err.message,
      stack: err.stack
    }
  )
}

// Cannon set headers afeter they are sent to the cliente

function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  } else {
    next(err)
  }
}

module.exports = { logErrors, errorHandler, boomErrorHandler }