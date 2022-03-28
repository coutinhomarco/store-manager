const productsService = require('../services/products.service');

 const create = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    const { code, data } = await productsService.create(name, quantity);
    return res.status(code).json(data);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const { code, data } = await productsService.update(id, name, quantity);
    return res.status(code).json(data);
  } catch (error) {
    next(error);
  }
};

const getAll = async (_req, res, next) => {
  try {
    const { code, data } = await productsService.getAll();
    return res.status(code).json(data);
  } catch (error) {
    return next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { code, data } = await productsService.getById(id);
    return res.status(code).json(data);
  } catch (error) {
    return next(error);
  }
};

const exclude = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { data, code } = await productsService.exclude(id);
    return res.status(code).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = { create, update, getAll, getById, exclude };