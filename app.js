const express = require('express');
const morgan = require('morgan');

const app = express();

const products = require('./api/routes/products')();
const orders = require('./api/routes/orders')();

app.get('env') == 'development' && app.use(morgan('dev'));
app.use('/products', products);
app.use('/orders', orders);

app.use((req, res, next) => {
  res.status(200).json({
    message: 'it works'
  });
  next();
});

module.exports = app;
