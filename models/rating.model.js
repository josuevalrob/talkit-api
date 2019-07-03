const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  // *A Teacher can do the same things as an student. 
  // *A Teacher can create a ClassRoom.  
  rateable: mongoose.Types.ObjectId,
  owner: {
    ref: 'User',
    type: mongoose.Types.ObjectId
  },
  score: Number
}, {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = doc._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      }
    }
  })

const Rate = mongoose.model('Rate', ratingSchema);
module.exports = Rate;