var express = require('express');
const mongoose = require('mongoose');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const createError = require('http-errors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

require('./configs/db.config');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use((req, res, next) => {
  next(createError(404))
})

app.use((error, req, res, next) => {
  console.error(error);  
  res.status(error.status || 500);
  const data = {};

  if (error instanceof mongoose.Error.ValidationError) {
    res.status(400);
    data.errors = {}
    Object.keys(error.errors)
      .forEach(field => data.errors[field] = error.errors[field].message)
  } else if (error instanceof mongoose.Error.CastError) {
    res.status(404);
    error.message = 'Resource not found';
  }

  data.message = error.message
  res.json(data);
})

module.exports = app;
