const serialize = require('../helpers/serialize');
const modifySale = require('../helpers/modifySale');
const salesService = require('../services/sales.service');

const create = async (req, res, next) => {
  try {
    const sales = req.body;
    const { code, data } = await salesService.create(sales);
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

const update = async (req, res, next) => {
  try {
    const [data] = req.body;
    const { id } = req.params;
    const returnData = await modifySale(data, id);
    return res.status(200).json(returnData);
  } catch (error) {
    next(error);
  }
};

const exclude = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { code, data } = await salesService.exclude(id);
    return res.status(code).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  exclude,
};