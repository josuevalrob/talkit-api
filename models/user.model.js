const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10
const URL_PATTERN = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const userSchema = new mongoose.Schema({
  // *A Teacher can do the same things as an student. 
  // *A Teacher can create a ClassRoom.  
  role: { 
    type: String,
    enum: ['teacher', 'student'],
    default: 'student'
  },
  email: {
    type: String,
    required: [true, 'Email required'],
    unique: [true, 'email unique'], 
    trim: true,
    match: EMAIL_PATTERN
  },
  password: {
    type: String,
    required: [true, 'we need a password'],
    minlength: 3 //? validate
  }, 
  name:{
    type:String,
    required: [true, 'give me your name, at least 3 letters'],
    minlength: 3
  }, 
  sureName: {type:String}, 
  birthDate: {
    type: String,
    min: 1,
  },   
  avatarURL: {
    type: String,
    default: `https://gravatar.com/avatar/${Math.floor(Math.random()*90000)}?s=400&d=robohash&r=x`,
    // match: URL_PATTERN
   },
  isPrivate: {type: Boolean, default: false}, 

  showAge: {type: Boolean, default: true}, 
  showSureName: {type: Boolean, default: true}, 
  showCity: {type: Boolean, default: true}, 
  showFriends: {type: Boolean, default: true},   
  city: {
    type: String,
    lowercase: true,
  },
  country: {
    type: String,
    lowercase: true,
  },
}, {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = doc._id;
        delete ret._id;
        delete ret.__v;
        delete ret.password;
        if(!ret.showAge) delete ret.birthDate
        if(!ret.showSureName) delete ret.sureName
        if(!ret.showCity) delete ret.city        
        if(!ret.isPrivate){
          return ret
        } else {
          return {
            name : ret.name,
            avatarURL: ret.avatarURL
          }
        }
      }
    }
  })

userSchema.pre('save', function (next) {
  const user = this;
  
  if (!user.isModified('password')) { 
    next();
  } else {
    bcrypt.genSalt(SALT_WORK_FACTOR)
      .then(salt => {
        return bcrypt.hash(user.password, salt)
          .then(hash => {
            user.password = hash;
            next();
          })
      })
      .catch(error => next(error))
  }
});

userSchema.methods.checkPassword = function (password) {
  return bcrypt.compare(password, this.password);
}


const User = mongoose.model('User', userSchema);
module.exports = User;