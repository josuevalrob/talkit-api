const ClassRoom = require('./../models/classRoom.model')
const Unity = require('./../models/unity.model')

module.exports.showAll = (req, res, next) => {
  ClassRoom.find()
    .then(classes => {
      if(classes.length){
        // ! populate with the unities
        res.status(200).json(classes)
      } else {
        res.status(404).json({message:'This is just the beginning...'})
      }
    })
    .catch(next)
}

module.exports.create = (req, res, next) => {}

module.exports.detail = (req, res, next) => {}

module.exports.update = (req, res, next) => {}

module.exports.delete = (req, res, next) => {}