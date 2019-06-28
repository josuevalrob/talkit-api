const Event = require('./../models/events.model');

module.exports.userEvents = (req, res, next) => {//? show all user events. 
  Event.find({owner: req.user._id})
    .then(events => status(200).json(events))
    .catch()
}

module.exports.list = (req, res, next) => {//? Show all events. 
  Event.find()
    .then(events => status(200).json(events))
    .catch(next)
}

module.exports.add = (req, res, next) => {// ? add an event
  new Event({
    owner: req.user._id,
    name: 'random',
    date: new Date(),
    category: 'random',
    precio: 'random',
    languages: 'random',     
  })
    .then(event => res.status(201).json(event))
    .catch(next)
}

module.exports.getEvent = (req, res, next) => {
  Event.find({id: req.body.eId}) //eId: event Id
    .then(event => req.status(200).json(event))
    .catch(next)
}

module.exports.update = (req, res, next) => {
  Event.findByIdAndUpdate({id: req.body.eId}, req.body)
    .then()
    .catch()
}

module.exports.delete = (req, res, next) => {
  Event.findByIdAndDelete({id: req.body.eId})
    .then((dead)=>res.status(204))
    .catch(next)
}