require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const middlewares = require('./middlewares');

const app = express();
app.use(bodyParser.json());
app.use(middlewares.errorHandler);

const { ProductsController, SalesController } = require('./controllers/index');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
/// /////////////////////////////////////////////////////////////

app.get('/products', ProductsController.getAll);
app.get('/products/:id', ProductsController.getById);

app.get('/sales', SalesController.getAll);
app.get('/sales/:id', SalesController.getById);

// app.post('/products', middlewares.validateProducts);
// app.post('/sales', middlewares.validateSales);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
