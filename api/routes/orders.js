module.exports = () => {
  const router = require('express').Router();

  router.get('/', (req, res) => {
    res.status(200).json({
      message: 'handling GET reqs for /orders'
    });
  });
  router.post('/', (req, res) => {
    res.status(200).json({
      message: 'handling POST reqs for /orders'
    });
  });

  return router;
};
