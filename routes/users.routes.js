const express = require('express');
const router = express.Router();

const secure = require('../middlewares/secure.mid');
const userController = require('../controllers/user.controller');


router.post('/friend/add', secure.isAuthenticated, userController.addFriend);
router.get('/friend/pending', secure.isAuthenticated, userController.pendingFriends);
router.put('/friend/accept', secure.isAuthenticated, userController.acceptFriend);
router.delete('/friend/delete', secure.isAuthenticated, userController.rejectFriend)

router.get('/list', userController.list)
router.get('/:id', userController.profile)

module.exports = router;

//* for testing propouse
// router.get('/friends', secure.isAuthenticated, (req, res, next)=>{
//   Friend.find().then(friends => res.json(friends)).catch(next)
// });