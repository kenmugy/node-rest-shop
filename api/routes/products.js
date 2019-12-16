module.exports = () => {
  const router = require('express').Router();

  router.get('/', (req, res) => {
    res.status(200).json({
      message: 'handling GET reqs for /products'
    });
  });

  router.post('/', (req, res) => {
    const product = {
      name: req.body.name,
      price: req.body.price
    };
    res.status(201).json({
      message: 'producted was created',
      createdProduct: product
    });
  });

  router.get('/:productID', (req, res) => {
    const pid = req.params.productID;
    pid == '4148'
      ? res.status(200).json({
          message: 'you found the magic number',
          'magic number': pid
        })
      : res.status(404).json({
          message: 'you dint find the magic number'
        });
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
