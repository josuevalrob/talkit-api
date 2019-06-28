const express = require('express');
const router = express.Router();
const friendShiptController = require('../controllers/friendShip.controller')
router.post('/', friendShiptController.addFriend);
router.get('/', friendShiptController.pendingFriends);
router.put('/accept', friendShiptController.acceptFriend);
router.put('/reject', friendShiptController.rejectFriend)
router.delete('/delete', friendShiptController.deleteFriend)

module.exports = router;