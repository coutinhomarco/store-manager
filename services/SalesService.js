const salesModel = require('../models/SalesModel');

const getAll = async (_req, res, _next) => {
  try {
    const sales = await salesModel.getAll();
    return res.status(200).json(sales);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getById = async (req, res, _next) => {
  try {
    const { id } = req.params;
    const sale = await salesModel.getById(id);
    if (sale.length < 1) return res.status(404).json({ message: 'Sale not found' });
    return res.status(200).json(sale);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getAll, getById };