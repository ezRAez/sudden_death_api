var express = require('express'),
    router  = new express.Router();

// Require controllers.
var usersController   = require('../controllers/users');
var spotsController   = require('../controllers/spots');
var gamesController   = require('../controllers/games');
var ratingsController = require('../controllers/ratings');
var chatsController   = require('../controllers/chats');

// WELCOME ROUTE
router.get('/', function(req, res, next) {
  res.json({msg: "Welcome to the Sudden Death API!"});
})

//||||||||||||||||||||||||||--
// AUTHENTICATION ROUTE
//||||||||||||||||||||||||||--
router.post('/login', usersController.userAuth);
// Get info about currently logged in user
router.get('/me',     usersController.tokenVerify, usersController.decodeToken);

//||||||||||||||||||||||||||--
// USER ROUTES
//||||||||||||||||||||||||||--
router.get('/users',             usersController.userIndex);
router.get('/users/:user_id',    usersController.userShow);
router.post('/users',            usersController.userCreate);
router.put('/users/:user_id',    usersController.userUpdate);
router.delete('/users/:user_id', usersController.userDelete);

//||||||||||||||||||||||||||--
// SPOT ROUTES
//||||||||||||||||||||||||||--
router.get('/spots',             spotsController.spotIndex);
router.get('/spots/:spot_id',    spotsController.spotShow);
router.get('/spots-within',      spotsController.spotsWithin);
router.post('/spots',            spotsController.spotCreate);
router.put('/spots/:spot_id',    spotsController.spotUpdate);
router.delete('/spots/:spot_id', spotsController.spotDelete);

//||||||||||||||||||||||||||--
// GAME ROUTES
//||||||||||||||||||||||||||--
router.get('/users/:user_id/games',             gamesController.index);
router.get('/users/:user_id/games/:game_id',    gamesController.show);
router.post('/users/:user_id/games',            gamesController.create);
router.put('/users/:user_id/games/:game_id',    gamesController.update);
router.delete('/users/:user_id/games/:game_id', gamesController.destroy);

//||||||||||||||||||||||||||--
// RATING ROUTES
//||||||||||||||||||||||||||--
router.get('/users/:user_id/games/:game_id/ratings',               ratingsController.index);
router.get('/users/:user_id/games/:game_id/ratings/:rating_id',    ratingsController.show);
router.post('/users/:user_id/games/:game_id/ratings',              ratingsController.create);
router.put('/users/:user_id/games/:game_id/ratings/:rating_id',    ratingsController.update);
router.delete('/users/:user_id/games/:game_id/ratings/:rating_id', ratingsController.destroy);

//||||||||||||||||||||||||||--
// CHATS ROUTES
//||||||||||||||||||||||||||--
router.get('/users/:user_id/games/:game_id/chats',             chatsControllerndex);
router.post('/users/:user_id/games/:game_id/chats',            chatsControllerreate);
router.delete('/users/:user_id/games/:game_id/chats/:chat_id', chatsControllerestroy);

module.exports = router;
