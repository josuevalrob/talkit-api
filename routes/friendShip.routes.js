const express = require('express');
const router = express.Router();
const friendShiptController = require('../controllers/friendShip.controller')
router.post('/add', friendShiptController.addFriend);
router.get('/pending', friendShiptController.pendingFriends);
router.put('/accept', friendShiptController.acceptFriend);
router.put('/reject', friendShiptController.rejectFriend)
router.delete('/delete', friendShiptController.deleteFriend)

module.exports = router;