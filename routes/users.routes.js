const express = require('express');
const router = express.Router();

const secure = require('../middlewares/secure.mid');
const userController = require('../controllers/user.controller');

// Validate if the user want to be private
// router.get('/:id', secure.isAuthenticated, userController.profile);

router.post('/friend/add', secure.isAuthenticated, userController.addFriend);
router.get('/friend/pending', secure.isAuthenticated, userController.pendingFriends);
router.put('/friend/accept', secure.isAuthenticated, userController.acceptFriend);
router.delete('/friend/delete', secure.isAuthenticated, userController.rejectFriend)

router.get('/list', userController.list)
router.get('/:id', userController.profile)

module.exports = router;
