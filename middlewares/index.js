const PostSales = require('./PostSales');
const errorHandler = require('./errorHandler');
const serialize = require('./serialize');
const modifySale = require('./modifySale');

module.exports = {
  errorHandler,
  serialize,

  PostSales,
  modifySale,
};