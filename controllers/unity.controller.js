const Unity = require('./../models/unity.model')


module.exports.subscribe = (req, res, next) => {
}

module.exports.create = (req, res, next) => {
  req.body.owner = req.user.id
  new Unity(req.body)
    .save()
    .then(unity => res.status(201).json(unity))
    .catch(next)
}

module.exports.detial = (req, res, next) => {
  Unity.findById(req.params.unityId)
    .populate('owner')    
    .then(classRoom => {
      res.status(201).json(classRoom)
    })
    .catch(next)
}

module.exports.update = (req, res, next) => {
/**
 * ? From who and what can you update?
 * * By the teacher
 *   add new resources
 *   //add more Teachers
 * * By students. 
 *   Rating
 * ? Can I do both in the same controller?
 */
  const id = req.params.unityId
  Unity.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
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
  // req.¿?¿?¿()
  //   .then((dead)=>{
  //     console.log(dead)
  //     res.status(204).json()
  //   })
  //   .catch(next)
}