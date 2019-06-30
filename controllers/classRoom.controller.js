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
  req.body.owner = req.user.id
  new ClassRoom(req.body)
    .save()
    .then(classRoom => res.status(201).json(classRoom))
    .catch(next)
}

module.exports.detail = (req, res, next) => {
  ClassRoom.findById(req.params.classRoomId)
    .populate('owner') 
    //TODO: .populate('unities')
    .then(classRoom => {
      res.status(201).json(classRoom)
    })
    .catch()
}

module.exports.update = (req, res, next) => {
/**
 * ? From who and what can you update?
 * * By the teacher
 *   add new Unities
 *   //add more Teachers
 * * By students. 
 *   Rating
 * ? Can I do both in the same controller?
 */
  const id = req.params.classRoomId
  ClassRoom.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
    .then(clazz => {
      if (clazz) {
        res.status(201).json(clazz)
      } else {
        next(createError(404, 'user not found'))
      } 
    })
    .catch(next)
}

module.exports.delete = (req, res, next) => {
  // ! The only one who can DELETE this is the owner. 
  // // ? Should it be in a secure middleware??    
  req.classRoom.remove()
    .then((dead)=>{
      console.log(dead)
      res.status(204).json()
    })
    .catch(next)
}