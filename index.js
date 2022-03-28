require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const middlewares = require('./middlewares');
const controllers = require('./controllers/index');

const app = express();
app.use(bodyParser.json());
app.use(middlewares.errorHandler);

app.get('/products', controllers.Products.getAll);
app.get('/products/:id', controllers.Products.getById);

app.get('/sales', controllers.Sales.getAll);
app.get('/sales/:id', controllers.Sales.getById);

app.post('/products', middlewares.validateProducts, controllers.Products.create);
app.put('/products/:id', middlewares.validateProducts, controllers.Products.update);
app.delete('/products/:id', controllers.Products.exclude);

app.post('/sales', middlewares.validateSales, controllers.Sales.create);
app.put('/sales/:id', middlewares.validateSales, controllers.Sales.update);
app.delete('/sales/:id', controllers.Sales.exclude);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
