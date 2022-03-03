require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const middlewares = require('./middlewares');

const app = express();
app.use(bodyParser.json());
app.use(middlewares.errorHandler);

const controllers = require('./controllers/index');
// { GetProducts, GetSales, PostProducts, ModifyProduct, DeleteProduct }//
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
/// /////////////////////////////////////////////////////////////

app.get('/products', controllers.GetProducts.getAll);
app.get('/products/:id', controllers.GetProducts.getById);

app.get('/sales', controllers.GetSales.getAll);
app.get('/sales/:id', controllers.GetSales.getById);

app.post('/products', middlewares.validateProducts, controllers.PostProducts);
app.put('/products/:id', middlewares.validateProducts, controllers.ModifyProduct);
app.delete('/products/:id', controllers.DeleteProduct);

// app.post('/sales', middlewares.validateSales);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
