const { getAll, deleteProduct } = require('../models/ProductsModel');

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await getAll();
    const oldProduct = data.find((product) => product.id === Number(id));
    if (!oldProduct) return res.status(404).json({ message: 'Product not found' });
    await deleteProduct(id);
    return res.status(204).json({});
  } catch (error) {
    next(error);
  }
};