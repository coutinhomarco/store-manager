const validateProductId = (req, res, next) => {
  const [request] = req.body;
  const { productId } = request;
  if (!productId) return res.status(400).json({ message: '"productId" is required' });
next();
};

const validateQuantity = (req, res, next) => {
  const [request] = req.body;
  const { quantity } = request;
  if (!quantity) return res.status(400).json({ message: '"quantity" is required' });
  if (quantity < 1) {
    return res
      .status(422).json({ message: '"quantity" must be greater than or equal to 1' }); 
  }
  next();
};
module.exports = [validateProductId, validateQuantity];