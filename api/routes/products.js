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

  router.use('/:productID', async (req, res, next) => {
    try {
      const product = await Product.findById(req.params.productID);
      if (product) {
        req.product = product;
        return next();
      }
    } catch (error) {
      console.log(error);
      return res.status(404).json({ error: error.message });
    }
  });

  router
    .route('/:productID')
    .get((req, res) => res.status(201).json(req.product))
    .put(async (req, res) => {
      try {
        const { product } = req;
        product.name = req.body.name;
        product.price = req.body.price;
        const savedProduct = await product.save();
        res.status(200).json({
          message: 'REPLACED product',
          savedProduct
        });
      } catch (error) {
        res.send(error);
      }
    })
    .patch(async (req, res) => {
      try {
        const { product } = req;
        req.body._id && delete req.body._id;
        Object.entries(req.body).forEach(entry => {
          const key = entry[0];
          const value = entry[1];
          product[key] = value;
        });
        const patchedProduct = await product.save();
        res.status(200).json({
          message: 'PATCHED product',
          patchedProduct
        });
      } catch (error) {
        res.send(error);
      }
    })
    .delete((req, res) => {
      req.product.deleteOne(err => {
        if (err) {
          return res.send(err);
        }
        return res.sendStatus(204);
      });
    });

  return router;
};
