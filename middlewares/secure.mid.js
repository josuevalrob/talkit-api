const createError = require('http-errors');
const Participants = require('./../models/participants.model')

module.exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    next(createError(401));
  }
}

module.exports.isTeacher = (req, res, next) => {
  if (req.user.role == 'teacher') {
    next();
  } else {
    next(createError(401));
  }
}

module.exports.hasAccess = (req, res, next) => {
  next();
//   Participants.findOne({session: req.body.sId})
//     .then(session => { 
//       if(session.student.some(user => user.id === req.user.id)) {
//         req.classSession = session;
//         next()
//       } else {
//         next(createError(401))
//       }
//     })
//     .catch(next)
}