const { serialize } = require('../middlewares');
const modifySale = require('../middlewares/modifySale');
const salesService = require('../services/sales.service');

const PostSales = async (req, res, next) => {
  try {
    const sales = req.body;
    const { code, data } = await salesService.postSales(sales);
    return res.status(code).json(data);
  } catch (error) {
    next(error);
  }
};

const getAll = async (_req, res, next) => {
  try {
    const { code, data } = await salesService.getAll();
    return res.status(code).json(serialize(data));
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { code, data } = await salesService.getById(id);
    return res.status(code).json(serialize(data));
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