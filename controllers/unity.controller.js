const ClassRoom = require('./../models/classRoom.model')
const Unity = require('./../models/unity.model')
const Participants = require('./../models/participants.model')
const createError = require('http-errors');

// module.exports.acceptStudent = (req, res, next) => {
//   // * Just Student who paid can be subscribed. 
//   // ! Validate payment
//   // * the teacher will accept the student.. . . 
//   Participants.findOneAndUpdate({
//       unity: req.params.unityId, //* does it exist
//       // teacher: req.user.id, //* Just can be approved by the owner
//       student: req.body.studentId //* Check for that the student exist. 
//     })
//     .then(participant => {
//       if(!participant){
//         throw createError(404, 'Unity dont found')
//       } else {
//         participant.update({enabled: true})
//       }
//     })
//     .catch(next)
// }

module.exports.join = (req, res, next) => {
  //* The student will send the request. 
  Participants.findOne({unity: req.params.unityId, student: req.user.id})
    .populate('unity')
    .then(participant => {
      if(participant){
        throw createError(409, 'Ya has enviado la solicitud.')
      } else {
        // ? si es gratis, acepta. 
        return new Participants({
          student: req.user.id,
          enabled:  participant.unity.price === 0
        }).save() //* push into an array field
      } 
    })
    .then(participant => res.status(201).json(participant))
    .catch(next)
}

module.exports.create = (req, res, next) => {
  const cId = req.params.classRoomId 
  ClassRoom.find({_id: cId})
    .then(clazz => {
      if(!clazz){
        throw createError(404, 'Classroom not found')
      } else {
        req.body.classRoom =  cId
        req.body.owner =  req.user.id
        console.log(req.body)
        return new Unity(req.body).save()
      }
    })
    .then((unity)=>res.status(201).json(unity))           
    .catch(next)
}

module.exports.detail = (req, res, next) => {
  Unity.findById(req.params.unityId)
    .then(unity=>{
      if(!unity){
        throw createError(404, 'Unity do not found')
      } else {
        console.log(unity)
        res.status(200).json(unity)
      }
    })
    .catch(next)
}

module.exports.showAll = (req, res, next) => {
  const {classRoomId} = req.params
  Unity.find({classRoom:classRoomId})
    .then(unities => {
      if(unities.length){
        res.status(200).json(unities)
      } else {
        res.status(200).json({message:'There are not unities for this classroom'})
      }
    })
    .catch(next)
}

module.exports.participants = (req, res, next) => {
  // ? Search by participants to get the students and the teachers
  Participants.find({unity: req.params.unityId})
    .populate('teacher')
    .populate('unity')
    .populate('student')
    .then(unity => {
      if(!unity){
        throw createError(404, 'Unity do not found')
      } else {
        console.log(unity)
        res.status(200).json(unity)
      }
    })
    .catch(next)
    /**
     * * How it works?
     * * The Detail section appear with all the student. 
     * * Students approved and waiting to be approved. 
     * * The teacher clicks the student by the client id. 
     * ? how to allow grant access to all the unities from the CLassroom
     */
}

module.exports.update = (req, res, next) => {
  const uId = req.params.unityId
  const cId = req.params.classRoomId
  Unity.findOneAndUpdate(
    // * just can be updated by the owner.
    {_id: uId}, //Search params
    req.body, //body update
    { new: true, runValidators: true }) //options
    .then(unity => {
      if (unity) {
        res.status(201).json(unity)
      } else {
        next(createError(404, 'unity not found'))
      } 
    })
    .catch(next)
}

module.exports.delete = (req, res, next) => {
  // ! The only one who can DELETE this is the owner. 
  Unity.findOneAndDelete({_id : req.params.classRoomId, owner: req.user.id})
    .then(unity => {
      if(!unity){
        throw createError(404, 'Unity not found')
      }else {
        return unity.remove()
      }
    })
    .then(() => res.status(204).send())
    .catch(next)
}