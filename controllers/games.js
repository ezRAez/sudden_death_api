// Require resource's model(s).
var Game = require("../models/game"),
    User = require("../models/user");

//||||||||||||||||||||||||||--
// EXPORT GAMES CONTROLLER
//||||||||||||||||||||||||||--
module.exports = { index, userIndex, show, create, update, destroy };

//|||||||||||||||||||||||||||||||--
// GET GAMES - GAMES INDEX FOR USER
//|||||||||||||||||||||||||||||||--
function index(req, res) {
  Game.find({}, function(err, games) {
    if (err) res.send(err);

    res.json({ success: true, games});
  });
};

//|||||||||||||||||||||||||||||||--
// GET GAMES - GAMES INDEX FOR USER
//|||||||||||||||||||||||||||||||--
function userIndex(req, res) {
  Game.find({$or: [
    {player1: req.params.user_id},
    {player2: req.params.user_id}
  ]}).populate(['player1', 'player2']).exec(function(err, matches){
    if (err) res.send(err);

    res.json({success: true, matches})
  });
};

//||||||||||||||||||||||||||--
// GET GAME - SHOW GAME
//||||||||||||||||||||||||||--
function show(req, res) {
  Game.findById(req.params.game_id, function(err, game) {
    if (err) res.send(err);

    // return that game
    res.json({ success: true, game});
  });
};

//||||||||||||||||||||||||||--
// CREATE GAME
//||||||||||||||||||||||||||--
function create(req, res) {
  var game = new Game({
    player1:  req.params.user_id,
    player2:  req.body.player2,
    status:   req.body.status
  });

  game.save(function(err, game) {
    if (err) res.send(err);

    res.json({ success: true, msg: "game created", game: game });
  });
};

//||||||||||||||||||||||||||--
// UPDATE GAME
//||||||||||||||||||||||||||--
function update(req, res) {
  Game.findById(req.params.game_id, function(err, game) {
    for (var k in req.body) {
      if (game[k]) {
        game[k] = req.body[k];
      }
    }

    game.save(function(err, game) {
      if (err) res.send(err);

      res.json({ success: true, msg: "updated game", game: game });
    });
  });
};

//||||||||||||||||||||||||||--
// DELETE GAME
//||||||||||||||||||||||||||--
function destroy(req, res) {
  Game.remove({ _id: req.params.game_id }, function(err, game) {
    if (err) res.send(err);
    res.json({ success: true, msg: "Game deleted.", game: game });
  });
};
