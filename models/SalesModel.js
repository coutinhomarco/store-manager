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

const postSales = async (array) => {
  await connection
    .execute('INSERT INTO StoreManager.sales VALUES ()');
  const [saleId] = await connection
    .execute('SELECT MAX(id) as id FROM StoreManager.sales;');
  const [{ id }] = saleId;
  await array.map(async (sale) => {
    await connection
      .execute(`INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) 
      VALUES (?,?,?);`, 
    [id, sale.productId, sale.quantity]);
  });
  const returnArray = array.map((obj) => ({ productId: obj.productId, quantity: obj.quantity }));
  const returnObject = { id,
    itemsSold: returnArray };
  return returnObject;
};

module.exports = {
  getAll,
  getById,
  postSales,
};

//  const { id } = saleId;
