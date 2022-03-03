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

app.get('/products', controllers.Products.getAll);
app.get('/products/:id', controllers.Products.getById);

app.get('/sales', controllers.Sales.getAll);
app.get('/sales/:id', controllers.Sales.getById);

app.post('/products', middlewares.validateProducts, controllers.Products.PostProducts);
app.put('/products/:id', middlewares.validateProducts, controllers.Products.ModifyProducts);
app.delete('/products/:id', controllers.Products.DeleteProduct);

app.post('/sales', middlewares.validateSales, controllers.Sales.PostSales);
app.put('/sales/:id', middlewares.validateSales, controllers.Sales.PutSales);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
