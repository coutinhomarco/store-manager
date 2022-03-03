const salesModel = require('../models/SalesModel');
const middlewares = require('../middlewares');
const modifySale = require('../middlewares/modifySale');
// const { serialize } = require('../middlewares/serialize');

const PostSales = async (req, res, next) => {
  try {
    const sales = req.body;
    const returnValue = await middlewares.PostSales(sales);
    return res.status(201).json(returnValue);
  } catch (error) {
    next(error);
  }
};

const getAll = async (_req, res, next) => {
  try {
    const sales = await salesModel.getAll();
    return res.status(200).json(middlewares.serialize(sales));
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sale = await salesModel.getById(id);
    if (sale.length < 1) return res.status(404).json({ message: 'Sale not found' });
    return res.status(200).json(middlewares.serialize(sale));
  } catch (error) {
    next(error);
  }
};

const PutSales = async (req, res, next) => {
  try {
    const [data] = req.body;
    const { id } = req.params;
    const returnData = await modifySale(data, id);
    return res.status(200).json(returnData);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  PostSales,
  getAll,
  getById,
  PutSales,
};