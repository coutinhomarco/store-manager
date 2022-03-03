const { getAll, modifyProduct } = require('../models/ProductsModel');

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const data = await getAll();
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