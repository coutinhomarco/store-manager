const middlewares = require('../middlewares');
const salesModel = require('../models/SalesModel');

const postSales = async (sales) => {
    const returnValue = await middlewares.PostSales(sales);
    return { code: 200, data: returnValue };
};

const getAll = async () => {
    const sales = await salesModel.getAll();
    return { code: 200, data: sales };
};

const getById = async (id) => {
    const sale = await salesModel.getById(id);
    if (sale.length < 1) return { code: 404, data: { message: 'Sale not found' } };
    return { code: 200, data: sale };
};

module.exports = { postSales, getAll, getById };