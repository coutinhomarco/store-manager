const productsModel = require('../models/ProductsModel');

const getAll = async (_req, res, _next) => {
  try {
    const products = await productsModel.getAll();
    return res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getById = async (req, res, _next) => {
  try {
    const { id } = req.params;
    const [product] = await productsModel.getById(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    return res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getAll, getById };