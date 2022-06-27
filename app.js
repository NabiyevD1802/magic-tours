const express = require('express');
const morgan = require('morgan');

const app = express();
const tourRouter = require('./router/tourRouter.js');
const userRouter = require('./router/userRouter.js');

app.use(express.json());
app.use(morgan('dev'));

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use(express.static('public'));

app.all('*', (res, req, next) => {
  const err = {
    sttusCode: 404,
    status: 'FAIL',
    message: `this url has not found: ${req.originalUrl}`,
  };
  next(err);
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 404;
  err.status = err.status || 'FAIL';
  err.message = err.message || 'Not found';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

module.exports = app;
