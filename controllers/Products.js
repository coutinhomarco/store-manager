const productsService = require('../services/productsService');

 const PostProducts = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    const { code, data } = await productsService.postProducts(name, quantity);
    return res.status(code).json(data);
  } catch (error) {
    next(error);
  }
};

const ModifyProducts = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const { code, data } = productsService.modifyProduct(id, name, quantity);
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
    const { code, data } = await productsService.getOne(id);
    return res.status(code).json(data);
  } catch (error) {
    return next(error);
  }
};

const DeleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { data, code } = await productsService.deleteOne(id);
    return res.status(code).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = { 
  PostProducts,
  ModifyProducts,
  getAll, 
  getById,
  DeleteProduct,
};