const express = require('express');
const UserService = require('../services/userService');

const router = express.Router();
//const service = new UserService();

//listar usuarios
router.get('/', async (req, res) => {
  const users = await UserService.list();
  res.status(200).json(users)
})

//crear  usuario
router.post('/', async (req, res) => {
  const body = req.body;
  const user = await UserService.create(body);
  res.status(201).json({
    message: 'Usuario Creado con exito',
    user: user
  });
})


//listar usuario por ID
router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await UserService.findOne(id)
    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
})


//actualizar usuario
router.patch('/:id', async (req, res) => {
  const body = req.body;
  const { id } = req.params;
  const user = await UserService.update(id, body)
  res.json((user) ? { message: 'Usuario actualizado con exito', data: user } : { message: 'Usuario no encontrado' })
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const user = await UserService.delete(id)
  res.json({
    message: `Usuario ${user} eliminado con exito`,
  })
})

module.exports = router;
