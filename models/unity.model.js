const mongoose = require('mongoose')

const unitySchema = new mongoose.Schema({
  name:{
    type: String, 
    required: true 
  }, 
  rating: {
    type: Number, 
    default: 0
  },
  // owner: { // ? multiple teachers per session. 
  //   type: mongoose.Types.ObjectId,
  //   ref: 'User',
  //   required: true
  // },
  numUserRating: Number,
  description: {
    type: String,
    required: 'Text is required',
    minlength: [50, 'Minimun 50 characters, dont be lazy!! ;)'],
  },
  classRoom: { 
    type: mongoose.Schema.Types.ObjectId, ref: 'ClassRoom',
    required: true
  },
  notesTitle: String,
  markDown: {
    type: String, 
    minlength: [140, 'Dude, write at least one tweet. about this. . . ']
  },
  resources: [{ //? qué se guarda aquí, una ULR?
    type: String
  }], 
  price: { //* a lesson has a price. 
    // TODO:  you have to be accepted. 
    type: Number,
    default: 0 //* if is 0, is free. 
    ////match: regex,
  },
  // participants:[{
  //   type: mongoose.Types.ObjectId,
  //   ref: 'User', 
  //   required: true
  // }],  
}, {
  timestamps: true, 
  toJSON: {
    transform: function(doc, ret){
      ret.id = doc.id;
      delete ret._id,
      delete ret.__v;
      return ret;
    }
  }
})

unitySchema.virtual('ratings', {
  ref: 'Rating', // The model to use
  localField: '_id', // ? Find people where `localField`
  foreignField: 'rateable', // is equal to `foreignField`
  options: { sort: { createdAt: -1 } } 
});


const Unity = mongoose.model('Unity', unitySchema);
module.exports = Unity;