const mongoose = require('mongoose');

const friendsSchema = new mongoose.Schema({
  requester: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  accepted: {type: Boolean, default: false}
}, {timestamps: true});
// ? revisar el controller. 
// ! es posible validar que la relación de solicitud, no exista antes de guardar?
// friendsSchema.pre('save', function (next) {
//   const friendShip = this;
  
// })

const Friends = mongoose.model('Friends', friendsSchema);
module.exports = Friends;
