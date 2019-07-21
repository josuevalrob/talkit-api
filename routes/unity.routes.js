const express = require('express');
const router = express.Router({mergeParams: true});

const sc = require('../middlewares/secure.mid');
const unityController = require('../controllers/unity.controller')

//* /class-rooms/:classRoomId/unities
// router.put('/:unityId', sc.isAuthenticated, unityController.sub); //* subscribe
// // //* CRUD
router.post('/', sc.isAuthenticated, sc.isTeacher, unityController.create);
router.get('/:unityId', sc.isAuthenticated, sc.hasAccess, unityController.detail);

router.get('/', unityController.showAll);

// router.get('/:unityId', sc.isAuthenticated, sc.hasAccess, unityController.participants); //* access
router.put('/:unityId', sc.isAuthenticated, sc.isTeacher, unityController.update);
router.delete('/:unityId', sc.isAuthenticated, unityController.delete);

// JOint. 
router.post('/:unityId/join', sc.isAuthenticated, unityController.join); //accept request
router.post('/:unityId/participants/', sc.isAuthenticated, sc.isTeacher, unityController.join);


module.exports = router;