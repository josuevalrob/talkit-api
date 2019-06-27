const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

router.get('/list', userController.list)
router.get('/:id', userController.profile)

module.exports = router;