const createError = require('http-errors');
const Participants = require('./../models/participants.model')
const ClassRoom = require('./../models/classRoom.model')
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

module.exports.isOwner = (req, res, next) => {
  // ! this function should be more generic. 
  ClassRoom.findById(req.params.classRoomId)
    .then(clazz => {
      if(clazz.owner && clazz.owner == req.user.id){
        req.classRoom = clazz // ? save the query...
        next(); 
      } else {
        next(createError(401));
      }
    })
    .catch(next)
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