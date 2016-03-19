var express = require('express'),
    router  = new express.Router();

// Require controllers.
var usersController   = require('../controllers/users');
var spotsController   = require('../controllers/spots');
var gamesController   = require('../controllers/games');
var ratingsController   = require('../controllers/ratings');

router.get('/', function(req, res, next) {
  res.json({msg: "Welcome to the Sudden Death API!"});
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

//||||||||||||||||||||||||||--
// SPOT ROUTES
//||||||||||||||||||||||||||--
router.get('/spots',                                          spotsController.spotIndex);
router.get('/spots/:spot_id',    usersController.tokenVerify, spotsController.spotShow);
router.get('/spots-within',                                   spotsController.spotsWithin);
router.post('/spots',                                         spotsController.spotCreate);
router.put('/spots/:spot_id',    usersController.tokenVerify, spotsController.spotUpdate);
router.delete('/spots/:spot_id', usersController.tokenVerify, spotsController.spotDelete);

//||||||||||||||||||||||||||--
// RATINGS ROUTES
//||||||||||||||||||||||||||--
router.get('/users/:user_id/games/:game_id/ratings',              usersController.tokenVerify, ratingsController.index);
router.get('/users/:user_id/games/:game_id/ratings/:rating_id',   usersController.tokenVerify, ratingsController.show);
router.post('/users/:user_id/games/:game_id/ratings',             usersController.tokenVerify, ratingsController.create);
router.put('/users/:user_id/games/:game_id/ratings/rating_id',    usersController.tokenVerify, ratingsController.update);
router.delete('/users/:user_id/games/:game_id/ratings/rating_id', usersController.tokenVerify, ratingsController.destroy);

module.exports = router;
