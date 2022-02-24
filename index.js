require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const { ProductsService, SalesService } = require('./services/index');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
/// /////////////////////////////////////////////////////////////

app.get('/products', ProductsService.getAll);
app.get('/products/:id', ProductsService.getById);

app.get('/sales', SalesService.getAll);
app.get('/sales/:id', SalesService.getById);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
