module.exports = () => {
  const router = require('express').Router();

  router.get('/', (req, res) => {
    res.status(200).json({
      message: 'orders were fetched'
    });
  });

  router.post('/', (req, res) => {
    res.status(201).json({
      message: 'order was created'
    });
  });

  router.get('/:orderID', (req, res) => {
    res.status(200).json({
      message: 'order details',
      orderID: req.params.orderID
    });
  });

  router.patch('/:orderID', (req, res) => {
    res.status(200).json({
      message: 'order updated',
      orderID: req.params.orderID
    });
  });

  router.put('/:orderID', (req, res) => {
    res.status(200).json({
      message: 'order replaced',
      orderID: req.params.orderID
    });
  });

  router.delete('/:orderID', (req, res) => {
    res.status(200).json({
      message: 'order deleted',
      orderID: req.params.orderID
    });
  });

  return router;
};
