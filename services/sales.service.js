const postSalesHelper = require('../helpers/PostSales');
const serialize = require('../helpers/serialize');
const salesModel = require('../models/SalesModel');

const create = async (sales) => {
    const returnValue = await postSalesHelper(sales);
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

const exclude = async (id) => {
    try {
      const all = await salesModel.getAll();
      const teste = serialize(all);
      const oldProduct = teste.find((product) => product.saleId === Number(id));
      if (!oldProduct) return { code: 404, data: { message: 'Sale not found' } };
      const data = await salesModel.deleteSale(id);
      return { code: 204, data };
    } catch (error) {
      return { code: 500 };
    }
  };

module.exports = { exclude, getAll, getById, create };