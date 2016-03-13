var express = require('express'),
    router  = new express.Router();

// Require controllers.
var usersController   = require('../controllers/users');
var spotsController   = require('../controllers/spots');

router.get('/', function(req, res, next) {
  res.json({msg: "Welcome to the Sudden Death API!"});
})

//||||||||||||||||||||||||||--
// AUTHENTICATION ROUTE
//||||||||||||||||||||||||||--
router.post('/api/login',            usersController.userAuth);

// Get info about currently logged in user
router.get('/api/me',                usersController.tokenVerify, usersController.decodeToken);

//||||||||||||||||||||||||||--
// USERS ROUTES
//||||||||||||||||||||||||||--
router.get('/api/users',                                          usersController.userIndex);
router.get('/api/users/:user_id',    usersController.tokenVerify, usersController.userShow);
router.post('/api/users',                                         usersController.userCreate);
router.put('/api/users/:user_id',    usersController.tokenVerify, usersController.userUpdate);
router.delete('/api/users/:user_id', usersController.tokenVerify, usersController.userDelete);

//||||||||||||||||||||||||||--
// SPOT ROUTES
//||||||||||||||||||||||||||--
router.get('/api/spots',                                          spotsController.spotIndex);
router.get('/api/spots/:spot_id',    usersController.tokenVerify, spotsController.spotShow);
router.get('/api/spots-within',                                   spotsController.spotsWithin);
router.post('/api/spots',                                         spotsController.spotCreate);
router.put('/api/spots/:spot_id',    usersController.tokenVerify, spotsController.spotUpdate);
router.delete('/api/spots/:spot_id', usersController.tokenVerify, spotsController.spotDelete);

module.exports = router;
