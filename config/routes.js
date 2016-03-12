var express = require('express'),
    router  = new express.Router();

// Require controllers.
var usersController   = require('../controllers/users');

router.get('/', function(req, res, next) {
  res.json(msg: "Welcome to the Sudden Death API!");
})

//||||||||||||||||||||||||||--
// AUTHENTICATION ROUTE
//||||||||||||||||||||||||||--
router.post('/login',            usersController.userAuth);

// Get info about currently logged in user
router.get('/me',                usersController.tokenVerify, usersController.decodeToken);

//||||||||||||||||||||||||||--
// USERS ROUTES
//||||||||||||||||||||||||||--
router.get('/users',                                          usersController.userIndex);
router.get('/users/:user_id',    usersController.tokenVerify, usersController.userShow);
router.post('/users',                                         usersController.userCreate);
router.put('/users/:user_id',    usersController.tokenVerify, usersController.userUpdate);
router.delete('/users/:user_id', usersController.tokenVerify, usersController.userDelete);

module.exports = router;
