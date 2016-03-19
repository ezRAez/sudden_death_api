// STILL NEEDS WORK!! ONLY PUSHED TO GET STARTED!

// Require resource's model(s).
var Game = require("../models/game"),
    User = require("../models/user");

var ratingsController = {
  index:   index,
  show:    show,
  create:  create,
  update:  update,
  destroy: destroy
};

//|||||||||||||||||||||||||||||||--
// GET RATINGS - RATINGS INDEX FOR USER
//|||||||||||||||||||||||||||||||--
function index(req, res) {
  Game.find({}, function(err, games) {

    if (err) res.send(err);

    var id = req.params.user_id;
    var ratings = [];
    games.forEach(function(game) {
      game.player1 === id ? ratings.push(game.p1rating[0]) : ratings.push(game.p2rating[0]);
    })
    res.json(ratings);
  });
}

//||||||||||||||||||||||||||--
// GET RATING - SHOW RATINGS OF A GAME
//||||||||||||||||||||||||||--
// function gameRatings(req, res) {
//   Game.findById(req.params.game_id, function(err, game) {
//     if (err) res.send(err);
//
//     // return that rating
//     res.json([game.p1rating[0], game.p2rating[0]]);
//   });
// };

//||||||||||||||||||||||||||--
// GET RATING - SHOW RATING
//||||||||||||||||||||||||||--
function show(req, res) {
  Game.findById(req.params.game_id, function(err, game) {
    if (err) res.send(err);
    var rating;
    if (game.p1rating[0]._id === req.params.rating_id) rating = game.p1rating[0];
    if (game.p2rating[0]._id === req.params.rating_id) rating = game.p2rating[0];
    // return that rating
    res.json(rating);
  });
};

//||||||||||||||||||||||||||--
// CREATE RATING
//||||||||||||||||||||||||||--
function create(req, res) {
  Game.findById(req.params.game_id, function(err, game) {
    var rating = {
      insideO:       req.body.insideO,
      outsideO:      req.body.outsideO,
      defense:       req.body.defense,
      sportsmanship: req.body.sportsmanship,
      comment:       req.body.comment
    };

    if (req.params.user_id === game.player1) {
      Game.p2rating.push(rating).save(function(err, game) {
        res.json({ message: "Rating created.", game: game });
      });
    } else if (req.params.user_id === game.player2) {
      Game.p1rating.push(rating).save(function(err, game) {
        res.json({ message: "Rating created.", game: game });
      });
    }
  });
};

//||||||||||||||||||||||||||--
// UPDATE RATING
//||||||||||||||||||||||||||--
function update(req, res) {
  Game.findById(req.params.game_id, function(err, game) {

    if (err) res.send(err);

    if (game.p1rating[0]._id === req.params.rating_id) {
      if (req.body.insideO)       game.p1rating[0].insideO       = req.body.insideO;
      if (req.body.outsideO)      game.p1rating[0].outsideO      = req.body.outsideO;
      if (req.body.defense)       game.p1rating[0].defense       = req.body.defense;
      if (req.body.sportsmanship) game.p1rating[0].sportsmanship = req.body.sportsmanship;
      if (req.body.comment)       game.p1rating[0].comment       = req.body.comment;
    } else if (game.p2rating[0]._id === req.params.rating_id) {
      if (req.body.insideO)       game.p2rating[0].insideO       = req.body.insideO;
      if (req.body.outsideO)      game.p2rating[0].outsideO      = req.body.outsideO;
      if (req.body.defense)       game.p2rating[0].defense       = req.body.defense;
      if (req.body.sportsmanship) game.p2rating[0].sportsmanship = req.body.sportsmanship;
      if (req.body.comment)       game.p2rating[0].comment       = req.body.comment;
    }

    // save the rating
    game.save(function(err, game) {
      if (err) res.send(err);

      // return a message
      res.json({ message: 'Rating updated!', game: game });
    });
  });
}

//||||||||||||||||||||||||||--
// DELETE RATING
//||||||||||||||||||||||||||--
function destroy(req, res) {
  Game.findById(req.params.game_id, function(err, game) {
    if (err) res.send(err);

    game.p1rating.pull(req.params.rating_id) || game.p2rating.pull(req.params.rating_id);
    game.save(function(err, game) {
      if (err) res.send(err);

      res.json({ msg: "Rating deleted.", game: game });
    });
  });
}

//||||||||||||||||||||||||||--
// EXPORT RATINGS CONTROLLER
//||||||||||||||||||||||||||--
module.exports = ratingsController;
