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
  teacher: { //? multiple teachers per ClassRoom. 
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rating: { //* rating from all ClassRooms
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
//* virtual field: help for populate
classRoomSchema.virtual('members', {
  ref: 'Unity', // The model to use
  localField: '_id', // Find people where `localField`
  foreignField: 'classRoom', // is equal to `foreignField`
  options: { sort: { createdAt: -1 } } 
});
const ClassRoom = mongoose.model('ClassRoom', classRoomSchema);
module.exports = ClassRoom;
