const express = require('express');
const ProductServices = require('../services/productService');
const validatorHandler = require('../middlewares/validator.handler');
const { createPorductSchema, updatePorductSchema, getProductSchema } = require('../schemas/product.shema');

const router = express.Router()
const service = new ProductServices();

//devuelve una lista de productos
router.get('/',
  async (req, res) => {
    const products = await service.find()
    res.status(200).json(products)
  }
);

router.get('/filter', (req, res) => {
  res.send('Yo soy un filtro')
})


router.post('/',
  validatorHandler(createPorductSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const product = await service.create(body);
    res.status(201).json({
      message: 'Producto creado con exito',
      body: product
    })
  })


router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    //destructuramos los parametros
    const { id } = req.params;
    try {
      const product = await service.findOne(id)
      res.status(200).json(product)
    } catch (error) {
      // res.status(404).json({
      //   message: error.message
      // })
      next(error)
    }
  });


router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updatePorductSchema, 'body'),
  async (req, res, next) => {
    const body = req.body;
    const { id } = req.params;
    try {
      const product = await service.update(id, body);
      res.json(product)
    } catch (error) { next(error) }
  })

router.delete('/:id', async (req, res) => {
  //const body = req.body;
  const { id } = req.params;
  product = await service.delete(id);
  res.json(product);
})
module.exports = router;
