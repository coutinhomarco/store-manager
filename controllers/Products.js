const { 
  postProduct, 
  getAll: getAllModel, modifyProduct, deleteProduct } = require('../models/ProductsModel');
const productsModel = require('../models/ProductsModel');

 const PostProducts = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    let product = await getAllModel();
    const findSameName = product.find((obj) => obj.name === name);
    if (findSameName) return res.status(409).json({ message: 'Product already exists' });
    await postProduct(name, quantity);
    product = await getAllModel();
    const postedProducts = product.find((obj) => obj.name === name);
    return res.status(201).json(postedProducts);
  } catch (error) {
    next(error);
  }
};

const ModifyProducts = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const data = await getAllModel();
    const oldProduct = data.find((product) => product.id === Number(id));
    if (!oldProduct) return res.status(404).json({ message: 'Product not found' });
    const updatedProduct = {
      id: oldProduct.id, name, quantity,
    };
    await modifyProduct(name, quantity, id);
    return res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

const getAll = async (_req, res, next) => {
  try {
    const products = await productsModel.getAll();
    return res.status(200).json(products);
  } catch (error) {
    return next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [product] = await productsModel.getById(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    return res.status(200).json(product);
  } catch (error) {
    return next(error);
  }
};

const DeleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await getAllModel();
    const oldProduct = data.find((product) => product.id === Number(id));
    if (!oldProduct) return res.status(404).json({ message: 'Product not found' });
    await deleteProduct(id);
    return res.status(204).json({});
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