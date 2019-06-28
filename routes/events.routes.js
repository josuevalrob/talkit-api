const express = require('express');
const router = express.Router();

// const secure = require('../middlewares/secure.mid');
// const eventController = require('../controllers/event.controller');

//*all events from a user
router.get('/mine', secure.isAuthenticated, eventController.userEvents);  
 //* all events
router.get('/', eventController.list);
//* CRUD
router.post('/', eventController.add);
router.get('/:id', secure.isAuthenticated, eventController.getEvent);
router.put('/:id', secure.isAuthenticated, eventController.update)
router.delete('/:id', secure.isAuthenticated, eventController.delete)

module.exports = router;