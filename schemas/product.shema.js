const joi = require('joi');

const id = joi.string().uuid();
const name = joi.string().min(3).max(15);
const price = joi.number().integer().min(10);
const image = joi.string().uri();

const createPorductSchema = joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required()
})

const updatePorductSchema = joi.object({
  name: name,
  price: price.required(),
  image: image
})

const getProductSchema = joi.object({
  id: id.required()
})

module.exports = { createPorductSchema, updatePorductSchema, getProductSchema }