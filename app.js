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
  res.status(404).json({
    status: 'FAIL',
    message: 'Bunday route mavjud emas',
  });
  next();
});

module.exports = app;
