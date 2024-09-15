const { fa } = require('@faker-js/faker');
const boom = require('@hapi/boom');
//tiene que ser dinamico
function validatorHandler(schema, props) {
  //clousures
  return (req, res, next) => {
    const data = req[props]; // puede venir en body, params, o query
    const { error } = schema.validate(data, { abortEarly: false })
    if (error) {
      next(boom.badRequest(error))//para que envie todos los errores juntos
    }
    next();//fesco siga con su trabajo
  }
}

module.exports = validatorHandler;