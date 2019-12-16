module.exports = Product => {
  const router = require('express').Router();

  router.get('/', async (req, res) => {
    try {
      const products = await Product.find();
      res.status(200).json({
        message: 'handling GET reqs for /products',
        products
      });
    } catch (error) {
      console.log(error);
    }
  });

  router.post('/', async (req, res) => {
    try {
      const product = new Product({
        name: req.body.name,
        price: req.body.price
      });
      const savedProduct = await product.save();
      res.status(201).json({
        message: 'Handling POST req for /products',
        createdProduct: savedProduct
      });
    } catch (error) {
      console.log(error);
    }
  });

  router.get('/:productID', async (req, res) => {
    try {
      const pid = req.params.productID;
      const product = await Product.findById(pid);
      product
        ? res.status(200).json(product)
        : res.status(404).json({ message: `no valid entry for ID: ${pid}` });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  });

  router.patch('/:productID', (req, res) => {
    res.status(200).json({
      message: 'UPDATED product'
    });
  });

  router.put('/:productID', (req, res) => {
    res.status(200).json({
      message: 'REPLACED product'
    });
  });

  router.delete('/:productID', (req, res) => {
    res.status(200).json({
      message: 'DELETED product'
    });
  });

  return router;
};
