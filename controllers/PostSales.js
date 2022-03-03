const middlewares = require('../middlewares');

module.exports = async (req, res, next) => {
  try {
    const sales = req.body;
    const returnValue = await middlewares.PostSales(sales);
    return res.status(201).json(returnValue);
  } catch (error) {
    next(error);
  }
};