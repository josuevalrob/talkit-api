const User = require('../models/user.model');
const Friend = require('../models/user.model')

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

module.exports.addFriend = (req, res, next) => {
  //! Validar que la relación no exista. 
  //! Validar que no sea un usuario bloqueado
  //? Friend.findOne({ $or: ... })
  console.log('adding friend')
  new Friend({
    requester: req.user._id,
    recipient: req.body.recID,
  }).save()
    .then(()=>{
      console.log('inside the then... ')
      res.status(204)
    })
    .catch(next)
}
module.exports.pendingFriends = (req, res, next) => {
  //* Busco usuarios que me han pedido ser amigo suyo 
  Friend.find({recipient: req.user._id, accepted: false})
    .populate('requester')
    .then(friends => { 
      if(friends.length){
        res.json(friends.map(f => f.requester))
      } else {
        res.status(404).json({message:'No pending Friends'})
      }
    })
    .catch(next)
}
module.exports.acceptFriend = (req, res, next) => {
  //* desde mis peticiones pendientes, acepto a mis requesters
  Friend.findOneAndUpdate({
    requester: req.body.recID, 
    recipient: req.user._id,
    accepted: false
  }, {accepted: true})
    .then(()=>res.status(204))
    .catch(next)

}
module.exports.rejectFriend = (req, res, next) => {
  //* desde mis peticiones pendientes, elimino a mis requesters
  Friend.findOneAndDelete({
    requester: req.body.recID, 
    recipient: req.user._id,
    accepted: false
  })
    .then(()=>res.status(204))
    .catch(next)
}
