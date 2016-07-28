var express = require('express'),
    router  = new express.Router();

// Require controllers.
var usersController   = require('../controllers/users');
var spotsController   = require('../controllers/spots');
var gamesController   = require('../controllers/games');
var ratingsController = require('../controllers/ratings');
var chatsController   = require('../controllers/chats');
var auth              = require('../controllers/auths');

// WELCOME ROUTE
router.get('/', function(req, res, next) {
  res.json({msg: 'Welcome to the Sudden Death API!'});
})

//||||||||||||||||||||||||||--
// AUTHENTICATION ROUTE
//||||||||||||||||||||||||||--
router.post('/login', auth.userAuth);
// Get info about currently logged in user
router.get('/me',     auth.tokenVerify, auth.decodeToken);

//||||||||||||||||||||||||||--
// USER ROUTES
//||||||||||||||||||||||||||--
router.get('/users',             usersController.index);
router.get('/users/:user_id',    usersController.show);
router.post('/users',            usersController.create);
router.put('/users/:user_id',    usersController.update);
router.delete('/users/:user_id', usersController.destroy);

//||||||||||||||||||||||||||--
// SPOT ROUTES
//||||||||||||||||||||||||||--
router.get('/spots',             spotsController.index);
router.get('/spots/:spot_id',    spotsController.show);
router.get('/spots-within',      spotsController.spotsWithin);
router.post('/spots',            spotsController.create);
router.put('/spots/:spot_id',    spotsController.update);
router.delete('/spots/:spot_id', spotsController.destroy);

//||||||||||||||||||||||||||--
// GAME ROUTES
//||||||||||||||||||||||||||--
router.get('/games',                 gamesController.index);
router.get('/users/:user_id/games',  gamesController.userIndex);
router.get('/games/:game_id',        gamesController.show);
router.post('/users/:user_id/games', gamesController.create);
router.put('/games/:game_id',        gamesController.update);
router.delete('/games/:game_id',     gamesController.destroy);

//||||||||||||||||||||||||||--
// RATING ROUTES
//||||||||||||||||||||||||||--
router.get('/users/:user_id/ratings',                              ratingsController.index);
router.get('/users/:user_id/games/:game_id/ratings/:rating_id',    ratingsController.show);
router.post('/users/:user_id/games/:game_id/ratings',              ratingsController.create);
router.put('/users/:user_id/games/:game_id/ratings/:rating_id',    ratingsController.update);
router.delete('/users/:user_id/games/:game_id/ratings/:rating_id', ratingsController.destroy);

//||||||||||||||||||||||||||--
// CHATS ROUTES
//||||||||||||||||||||||||||--
router.get('/users/:user_id/games/:game_id/chats',             chatsController.index);
router.post('/users/:user_id/games/:game_id/chats',            chatsController.create);
router.delete('/users/:user_id/games/:game_id/chats/:chat_id', chatsController.destroy);

module.exports = router;
