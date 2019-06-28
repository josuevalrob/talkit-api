const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String, 
  },
  date: {
    type: Date,
    required: true
  }, 
  location: {
    type: { type: String },
    coordinates: [Number]
  },
  category: {
    type: String, 
    required: true
  },
  precio: {
    type: Number, 
    required: true,
  },
  imageURL: {
    type: String,
    default: 'https://www.science-emergence.com/media/images/thumbnails_1000_1000/question-mark-img.JPEG'
  },
  maxParticipants: {
    type: Number,
    default: 10
  },
  participants: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
  }],
  languages: [{
    type: String, 
    required: true
  }], 
}, { 
  timestamps:true, 
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      ret.id = doc._id;
      delete ret._id;
      delete ret.__v;
    }
  }
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;