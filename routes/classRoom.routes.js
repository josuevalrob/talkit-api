const express = require('express');
const router = express.Router();

const sc = require('../middlewares/secure.mid');
const classRoomController = require('../controllers/classRoom.controller');

//* /class-rooms
router.get('/', classRoomController.showAll); //* all class
//* CRUD
router.post('/', sc.isAuthenticated, classRoomController.create);
router.get('/:classRoomId', classRoomController.detail); 
router.put('/:classRoomId', sc.isAuthenticated, classRoomController.update); 
router.delete('/:classRoomId', sc.isAuthenticated, sc.isOwner,classRoomController.delete);

module.exports = router;