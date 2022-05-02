const express = require('express');

const tourRouter = require('./router/tourRouter');
const userRouter = require('./router/userRouter');

const app = express();
const morgan = require('morgan');

app.use(express.json());

app.use(morgan('common'));

app.use((req, res, next) => {
  req.time = Date.now();
  next();
});

app.use(express.static(`${__dirname}/public`));

tourRouter.param('', (req, res, next, val) => {
  console.log(val);
  next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
