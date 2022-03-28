module.exports = (a) => (a.map(({ date, quantity, product_id: productId, sale_id: saleId }) => {
    if (!saleId) {
      return {
        date,
        productId,
        quantity,
      };
    }
    return {
      saleId,
      date,
      productId,
      quantity,
    };
  }));