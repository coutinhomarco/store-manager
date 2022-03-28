const productsModel = require('../models/ProductsModel');

const getAll = async () => {
  try {
    const products = await productsModel.getAll();
    return { code: 200, data: products };
  } catch (error) {
    return { code: 500 };
  }
};

const getById = async (id) => {
  try {
    const [product] = await productsModel.getById(id);
    if (!product) return { code: 404, data: { message: 'Product not found' } };
    return { code: 200, data: product };
  } catch (error) {
    return { code: 500 };
  }
};

const exclude = async (id) => {
  try {
    const data = await productsModel.getAll();
    const oldProduct = data.find((product) => product.id === Number(id));
    if (!oldProduct) return { code: 404, data: { message: 'Product not found' } };
    await productsModel.deleteProduct(id);
    return { code: 204, data: {} };
  } catch (error) {
    return { code: 500 };
  }
};

const update = async (id, name, quantity) => {
  try {
    const data = await productsModel.getAll();
    const oldProduct = data.find((product) => product.id === Number(id));
    if (!oldProduct) return { code: 404, data: { message: 'Product not found' } };
    const updatedProduct = {
      id: oldProduct.id, name, quantity,
    };
    await productsModel.modifyProduct(name, quantity, id);
    return { code: 200, data: updatedProduct };
  } catch (error) {
    return { code: 500, data: error.message };
  }
};

const create = async (name, quantity) => {
  try {
    let product = await productsModel.getAll();
    const findSameName = product.find((obj) => obj.name === name);
    if (findSameName) return { code: 409, data: { message: 'Product already exists' } };
    await productsModel.postProduct(name, quantity);
    product = await productsModel.getAll();
    const postedProducts = product.find((obj) => obj.name === name);
    return { code: 201, data: postedProducts };
  } catch (error) {
    return { code: 500 };
  }
};
module.exports = { getAll, getById, exclude, update, create };