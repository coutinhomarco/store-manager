const { postProduct, getAll } = require('../models/ProductsModel');

module.exports = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    let product = await getAll();
    const findSameName = product.find((obj) => obj.name === name);
    if (findSameName) return res.status(409).json({ message: 'Product already exists' });
    await postProduct(name, quantity);
    product = await getAll();
    const postedProducts = product.find((obj) => obj.name === name);
    return res.status(201).json(postedProducts);
  } catch (error) {
    next(error);
  }
};