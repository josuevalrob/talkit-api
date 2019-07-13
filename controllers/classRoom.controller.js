const ClassRoom = require('./../models/classRoom.model')
const Unity = require('./../models/unity.model')

module.exports.showAll = (req, res, next) => {
  ClassRoom.find()
    .then(classes => {
      if(classes.length){
        res.status(200).json(classes)
      } else {
        res.status(404).json({message:'This is just the beginning...'})
      }
    })
    .catch(next)
}

module.exports.create = (req, res, next) => {  
      console.log('creating class')

  req.body.owner = req.user.id
  new ClassRoom(req.body)
    .save()
    .then(classRoom => {
      console.log('created class')
      res.status(201).json(classRoom)
    })
    .catch(next)
}

module.exports.detail = (req, res, next) => {
  ClassRoom.findById(req.params.classRoomId)
    .populate('owner') 
    .populate('unities')
    .then(classRoom => {
      res.status(201).json(classRoom)
    })
    .catch(next)
}

module.exports.update = (req, res, next) => {
/**
 * ? From who and what can you update?
 * * By the teacher
 *   add new Unities
 *  // By students. 
 *  // Rating
 */
  const id = req.params.classRoomId
  ClassRoom.findOneAndUpdate(
    {_id: id, owner: req.user.id}, 
    req.body, 
    { new: true, runValidators: true }
  ).then(clazz => {
      if (clazz) {
        res.status(201).json(clazz)
      } else {
        next(createError(404, 'clazz not found'))
      } 
    })
    .catch(next)
}

module.exports.delete = (req, res, next) => {
  ClassRoom.findOneAndDelete({_id : req.params.classRoomId, owner: req.user.id})
    .then(clazz => {
      if (!clazz) {
        throw createError(404, 'Class room not found')
      }
      return Unity.remove({ classRoom: req.params.classRoomId })
    })
    .then(() => res.status(204).send())
    .catch(next)
}