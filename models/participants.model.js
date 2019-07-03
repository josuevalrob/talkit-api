const mongoose = require('mongoose');

const participantsSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}, 
  // teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  unity: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'unity',
    unique: true,
  },
  enabled: {type: Boolean, default: false} //? string
  // *add more data from the payment. 
}, {
  timestamps: true,
  toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = doc._id;
        delete ret._id;
        delete ret.__v;
      }
    }
});

const Participants = mongoose.model('Participants', participantsSchema);
module.exports = Participants;
 