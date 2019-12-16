const express = require('express');
const morgan = require('morgan');

const app = express();

const products = require('./api/routes/products')();
const orders = require('./api/routes/orders')();

app.get('env') == 'development' && app.use(morgan('dev'));
app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Header',
    'Origin, X-Requested-with, Content-Type, Accept, Authorization'
  );
  if (req.method == 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE, PATCH, PUT');
    return res.status(200).json({});
  }
});
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
