const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const createError = require('http-errors');
const passport = require('passport');
// configs
require('./configs/db.config');
require('./configs/passport.config');
const session = require('./configs/session.config')
const cors = require('./configs/cors.config')

// routers
const authRouter = require('./routes/auth.routes');
const userRouter = require('./routes/users.routes');
const friendRouter = require('./routes/friendShip.routes');

const classRoomRouter = require('./routes/classRoom.routes');
const unityRouter = require('./routes/unity.routes');
// initializing express...
const app = express();
// middlewares
const secure = require('./middlewares/secure.mid');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// authentication middlewares
app.use(cors)
app.use(session)
app.use(passport.initialize())
app.use(passport.session())

app.use('/', authRouter);
app.use('/users', userRouter);
app.use('/friends', secure.isAuthenticated, friendRouter)
app.use('/class-rooms', classRoomRouter);
// app.use('/class-rooms/:classRoomId/unities', unityRouter);
// ? cuando este listo firebase. 
// app.use('/unities/:unityId/messages', messageRouter);





//* Handling errors
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
