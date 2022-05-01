const express = require('express');

const tourRouter = require('./router/tourRouter');
const userRouter = require('./router/userRouter');

const app = express();
const morgan = require('morgan');

app.use(express.json()); // Middleware qorovulcha

app.use(morgan('common'));

app.use((req, res, next) => {
  req.time = Date.now();
  next();
});

// Static file middleware

app.use(express.static(`${__dirname}/public`));

// Params middleware

tourRouter.param('', (req, res, next, val) => {
  console.log(val);
  next();
});

// App Users routing

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
