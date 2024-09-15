/**
 * REST(Representational State Transfer)
 * servicios web que se comunican por medio deprotocolos HTTP
 * GET = Obtenemos informacion
 * PUT = Modificamos informacion
 * POST = Creamos informacion
 * DELETE = Eliminamos informacion
 *
 * Todas las rutas que son especificas van primero y a lo ultimo las estaticas
 *
 * /api/products
 * /api/categorias
 *
 * HTTP response status code
 *
 * ?informational responses (100-199)
 * *successful responses (200 - 299)
 * todo redirects (300 =399)
 * client errors (400-409)
 * !server errors (500-599)
 */

const express = require('express');
const cors = require('cors');
const routerApi = require('../api/routes');

//middlewares
const { errorHandler, logErrors, boomErrorHandler } = require('./middlewares/error.handler')

//creamos nuestra aplicacion
const app = express();
const port = process.env.PORT || 3000;

//midlewere nativo
app.use(express.json());


const whiteList = ['http://localhost:8080', 'https://myapp.com', 'http://localhost:3000'];
const options = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'))
    }
  }
}
app.use(cors(options))

//en este callback tenemos siempre un req y una res
app.get('/api', (req, res) => {
  res.send('Hola mi server en express')
});

routerApi(app);

//middleweres
app.use(logErrors);
app.use(boomErrorHandler)
app.use(errorHandler)


app.listen(port, () => {
  console.log(`Mi puerto http://localhost:${port}`)
});



// app.get('/home', (req, res) => {
//   res.send('<h1>Este es el home de la pagina</h1>')
// })

// app.get('/user', (req, res) => {
//   const { limit, offset } = req.query;
//   if (limit && offset) {
//     res.json({
//       limit,
//       offset
//     })
//   } else {
//     res.send('no hay parametros')
//   }
// })





// app.post("/", (req, res) => {
//   res.send('Got a Post request');
// });

// app.put('/user', (req, res) => {
//   res.send('Got a PUT resquest at /user')
// });

// app.delete('/user', (req, res) => {
//   res.send('Got a DELELTE request at /user')
// });

module.exports = app;