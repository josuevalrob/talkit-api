const User = require('../models/user.model');

const createError = require('http-errors');

module.exports.list = (req, res, next) => {
  //! add pagination
  User.find()
    .then(users => {
      res.status(201).json(users.filter(user => !user.isPrivate));
    })
    .catch(next)
}
module.exports.profile = (req, res, next) => {
  const id = req.params.id;
  User.findById(id)
    .then(user => {
      if(!user.isPrivate || req.isAuthenticated()) {
        res.status(201).json(user);
      } else {
        next(createError(401));
      }
    })
    .catch(next)  
}
