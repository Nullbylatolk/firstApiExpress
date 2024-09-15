const express = require('express');


const productsRouter = require('./productsRouter');
const categoriesRouter = require('./categoriesRouter')
const usersRouter = require('./usersRouter')

function routerApi(app){

  const router = express.Router()
  app.use('/api/v1',router);//ruta padre y de esa forma le eredo ese pedazo de ruta a mis demas rutas
    router.use('/products',productsRouter);
    router.use('/categories',categoriesRouter);
    router.use('/users',usersRouter);
}
module.exports = routerApi;
