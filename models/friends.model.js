const mongoose = require('mongoose');

const friendsSchema = new mongoose.Schema({
  requester: { type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
  accepted: {type: Boolean, default: false}
}, {timestamps: true});
const Friends = mongoose.model('Friends', friendsSchema);
module.exports = Friends;
