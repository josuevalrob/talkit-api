const mongoose = require('mongoose');
const Unity = require('./unity.model')

const classRoomSchema = new mongoose.Schema({
  name: {
    type: String, 
    required: true
  },
  category: [{ //topic
    type: String
  }],
  description: {
    type: String,
    required: 'Text is required',
    minlength: [50, 'Minimun 50 characters, dont be lazy!! ;)'],
  },
  owner: { // ? multiple teachers per session
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rating: { // * rating from all students
    type: Number, 
    default: 0
  }
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      ret.id = doc._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  },
});

classRoomSchema.virtual('unities', {
  ref: 'Unity', // The model to use
  localField: '_id', // Find people where `localField`
  foreignField: 'classRoom', // is equal to `foreignField`
  options: { sort: { createdAt: -1 } } 
});

classRoomSchema.virtual('ratings', {
  ref: 'Rating', // The model to use
  localField: '_id', // Find people where `localField`
  foreignField: 'rateable', // is equal to `foreignField`
  options: { sort: { createdAt: -1 } } 
});


const ClassRoom = mongoose.model('ClassRoom', classRoomSchema);
module.exports = ClassRoom;
