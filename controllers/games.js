// Require resource's model(s).
var Game = require("../models/game"),
    User = require("../models/user");

//||||||||||||||||||||||||||--
// EXPORT GAMES CONTROLLER
//||||||||||||||||||||||||||--
module.exports = {
  index:   index,
  show:    show,
  create:  create,
  update:  update,
  destroy: destroy
};

//|||||||||||||||||||||||||||||||--
// GET GAMES - GAMES INDEX FOR USER
//|||||||||||||||||||||||||||||||--
function index(req, res) {
  Game.find({}, function(err, games) {

    if (err) res.send(err);
    var matches = [];

    games.forEach(function(game) {
      var p1Id = game.player1.toString(), p2Id = game.player2.toString();
      if (p1Id === req.params.user_id || p2Id === req.params.user_id) matches.push(game);
    });
    res.json(matches);
  });
}

//||||||||||||||||||||||||||--
// GET GAME - SHOW GAME
//||||||||||||||||||||||||||--
function show(req, res) {
  Game.findById(req.params.game_id, function(err, game) {
    if (err) res.send(err);

    // return that game
    res.json(game);
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

    res.json({msg: "game created", game: game });
  })
};

//||||||||||||||||||||||||||--
// UPDATE GAME
//||||||||||||||||||||||||||--
function update(req, res) {
  Game.findById(req.params.game_id, function(err, game) {
    if (req.body.status)    game.status    = req.body.status;
    if (req.body.winner_id) game.winner_id = req.body.winner_id;
    if (req.body.spot)      game.spot      = req.body.spot;
    if (req.body.time)      game.time      = req.body.time;

    game.save(function(err, game) {
      if (err) res.send(err);

      res.json({ msg: "updated game", game: game });
    });
  });
}

//||||||||||||||||||||||||||--
// DELETE GAME
//||||||||||||||||||||||||||--
function destroy(req, res) {
  Game.remove({ _id: req.params.game_id }, function(err, game) {
    if (err) res.send(err);
    res.json({ msg: "Game deleted.", game: game });
  });
}
