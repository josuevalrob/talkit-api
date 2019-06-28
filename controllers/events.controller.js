const Event = require('./../models/events.model');

module.exports.userEvents = (req, res, next) => {
  //? show all user events. 
}

module.exports.list = (req, res, next) => {
  //? Show all events. 
  Event.find()
    .then(event => res.json(event))
    .catch(next)
}

module.exports.add = (req, res, next) => {
  // ? add an event
}

module.exports.getEvent = (req, res, next) => {
  // ? show an event. 
}

module.exports.update = (req, res, next) => {
}

module.exports.delete = (req, res, next) => {
}