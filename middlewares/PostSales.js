const SalesModel = require('../models/SalesModel');

module.exports = async (array) => {
  const id = await SalesModel.postSales(array);
  const returnArray = array.map((obj) => ({ productId: obj.productId, quantity: obj.quantity }));
  const returnObject = { id,
    itemsSold: returnArray };
  return returnObject;
};