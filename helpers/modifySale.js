const { update } = require('../models/SalesModel');

module.exports = async (data, id) => {
    await update(data, id);
    return {
      saleId: id,
      itemUpdated: [
        data,
      ],
    };
};