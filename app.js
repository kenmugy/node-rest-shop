const express = require('express');
const morgan = require('morgan');

const app = express();

const products = require('./api/routes/products')();
const orders = require('./api/routes/orders')();

app.get('env') == 'development' && app.use(morgan('dev'));
app.use('/products', products);
app.use('/orders', orders);

app.use((req, res, next) => {
  const err = new Error('Sorry, Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  });
});

module.exports = app;
