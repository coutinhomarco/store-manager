const connection = require('./connection');

const getAll = async () => {
  const [products] = await connection.execute('SELECT * FROM StoreManager.products;');
  return products;
};

const getById = async (id) => {
  const [products] = await connection
  .execute('SELECT * FROM StoreManager.products WHERE ID = ?;', [id]);
  return products;
};

const postProduct = async (name, quantity) => {
  if (!name || !quantity) return;
  const products = await connection
  .execute('INSERT INTO StoreManager.products (name, quantity) VALUES (?,?)', 
  [name, quantity]);
  return products;
};

const modifyProduct = async (name, quantity, id) => {
  const products = await connection
  .execute('UPDATE StoreManager.products SET name = ?, quantity = ? WHERE id = ?', 
  [name, quantity, id]);
  return products;
};

const deleteProduct = async (id) => {
  const products = await connection
  .execute('DELETE FROM StoreManager.products WHERE id = ?', 
  [id]);
  return products;
};

module.exports = {
  getAll,
  getById,
  postProduct,
  modifyProduct,
  deleteProduct,
};