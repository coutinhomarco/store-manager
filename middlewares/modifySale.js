const { modifySales } = require('../models/SalesModel');

module.exports = async (data, id) => {
    await modifySales(data, id);
    return {
      saleId: id,
      itemUpdated: [
        data,
      ],
    };
};