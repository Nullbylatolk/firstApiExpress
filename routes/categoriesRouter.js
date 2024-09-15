const express = require('express');
const CategoriesService = require('../services/categoriesService')

const router = express.Router();
// const service = new CategoriesService()
//listar categorias
router.get('/', async (req, res) => {
  const categories = await CategoriesService.list()
  res.status(200).json(categories)
})

//Crear categoria
router.post('/', async (req, res) => {
  const body = req.body;
  const categorie = await CategoriesService.create(body);
  res.status(201).json(categorie)
})

router.patch('/:id', async (req, res) => {
  const body = req.body;
  const { id } = req.params;
  try {
    const updateCategorie = await CategoriesService.update(id, body)
    res.status(201).json(updateCategorie)
  } catch (error) {
    return res.status(404).json({ message: error.message })
  }
})

//listar categoria por id
router.get('/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    const categories = await CategoriesService.findOne(id)
    res.status(200).json(categories)
  } catch (error) {

    // res.status(404).json({ message: error.message })
    next(error)
  }
})



router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const categorie = await CategoriesService.delete(id);
  res.status(200).json(categorie)
})

module.exports = router;
