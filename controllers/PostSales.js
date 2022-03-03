const { postSales } = require('../models/SalesModel');

module.exports = async (req, res, next) => {
  try {
    const sales = req.body;
    const returnValue = await postSales(sales);
    return res.status(201).json(returnValue);
  } catch (error) {
    next(error);
  }
};