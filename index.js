require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const middlewares = require('./middlewares');

const app = express();
app.use(bodyParser.json());
app.use(middlewares.errorHandler);

const { GetProducts, GetSales, PostProducts } = require('./controllers/index');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
/// /////////////////////////////////////////////////////////////

app.get('/products', GetProducts.getAll);
app.get('/products/:id', GetProducts.getById);

app.get('/sales', GetSales.getAll);
app.get('/sales/:id', GetSales.getById);

app.post('/products', middlewares.validateProducts, PostProducts);
// app.post('/sales', middlewares.validateSales);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
