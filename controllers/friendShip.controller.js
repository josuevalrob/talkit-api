const Friend = require('../models/friends.model')

module.exports.addFriend = (req, res, next) => {
  //! Validate a previus request from the same user
  //! Check if the requester is already bloqued. 
  //? Friend.findOne({ $or: ... })
  new Friend({
    requester: req.user._id,
    recipient: req.body.recID,
  }).save()
    .then((friendship)=>{
      res.status(201).json(friendship)
    })
    .catch(next)
}
module.exports.pendingFriends = (req, res, next) => {
  //* Search for users who wants to be my friend
  Friend.find({recipient: req.user._id, accepted: false})
    .populate('requester')
    .then(friends => { 
      if(friends.length){
        res.status(200).json(friends.map(f => f.requester))
      } else {
        res.status(404).json({message:"Don't pannic, everything is ookey. . ."})
      }
    })
    .catch(next)
}
module.exports.acceptFriend = (req, res, next) => {
  //* from my pending request, accept your new friend
  Friend.findOneAndUpdate({
    requester: req.body.recID, 
    recipient: req.user._id,
    accepted: false
  }, {accepted: true}, {useFindAndModify: false})
    .then((friendship)=>res.status(204).json(friendship))
    .catch(next)

}
module.exports.rejectFriend = (req, res, next) => {
  //* From my pending request, deneid your new friend. 
  Friend.findOneAndUpdate({
    requester: req.body.recID, 
    recipient: req.user._id,
    accepted: true
  }, {accepted: false}, {useFindAndModify: false})
    .then((friendship)=>res.status(204).json(friendship))
    .catch(next)
}

module.exports.deleteFriend = (req, res, next) => {
  //* Busco amigos y los elimino
  Friend.findOneAndDelete({
    requester: req.body.recID, 
    recipient: req.user._id,
  }, {useFindAndModify: false})
    .then(()=>res.status(204))
    .catch(next)
}
