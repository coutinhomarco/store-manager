const PostSales = require('./PostSales');
const errorHandler = require('./errorHandler');
const serialize = require('./serialize');
const validateProducts = require('./validateProducts');
const validateSales = require('./validateSales');
const modifySale = require('./modifySale');

module.exports = {
  errorHandler,
  serialize,
  validateProducts,
  validateSales,
  PostSales,
  modifySale,
};