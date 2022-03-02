const connection = require('./connection');
const { serialize } = require('../middlewares/index');

const getAll = async () => {
  const [sales] = await connection.execute(`SELECT sp.*  , s.date 
  FROM StoreManager.sales_products as sp 
  JOIN StoreManager.sales as s 
  ON s.id=sp.sale_id;`);
  return serialize(sales);
};

const getById = async (id) => {
  const [sale] = await connection
  .execute(`SELECT sp.product_id, sp.quantity  , s.date 
  FROM StoreManager.sales_products as sp 
  JOIN StoreManager.sales as s 
  ON s.id=sp.sale_id 
  WHERE sp.sale_id = ?;`, [id]);
  return serialize(sale);
};

module.exports = {
  getAll,
  getById,
};
