// STILL NEEDS WORK!! ONLY PUSHED TO GET STARTED!

// Require resource's model(s).
var Game = require("../models/game"),
    User = require("../models/user");

var ratingsController = {
  index:      index,
  showRating: showRating,
  create:     create,
  update:     update,
  delete:     delete
};

//|||||||||||||||||||||||||||||||--
// GET RATINGS - RATINGS INDEX FOR USER
//|||||||||||||||||||||||||||||||--
function index(req, res) {
  var id = req.params.user_id;
  Game.find({ player1: id, player2: id }, function(err, games) {
    if (err) res.send(err);

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
function showRatings(req, res) {
  Rating.findById(req.params.rating_id, function(err, rating) {
        if (err) res.send(err);

        // return that rating
        res.json(rating);
  });
};

//||||||||||||||||||||||||||--
// CREATE RATING
//||||||||||||||||||||||||||--
function ratingCreate(req, res) {
    var rating   = new Rating(req.body);
    // rating.rated = req.params.rated_id;

    rating.save(function(err) {
        if (err) {
            return res.json(err);
        }

        // return a message
        res.json({ message: "Rating created." });
      });

};

//||||||||||||||||||||||||||--
// UPDATE RATING
//||||||||||||||||||||||||||--
function ratingUpdate(req, res) {
  Rating.findById(req.params.rating_id, function(err, rating) {

        if (err) res.send(err);

        // set the new rating information if it exists in the request
        if (req.body.insideO)       rating.insideO       = req.body.insideO;
        if (req.body.outsideO)      rating.outsideO      = req.body.outsideO;
        if (req.body.defense)       rating.defense       = req.body.defense;
        if (req.body.sportsmanship) rating.sportsmanship = req.body.sportsmanship;
        if (req.body.comment)       rating.comment       = req.body.comment;

        // save the rating
        rating.save(function(err) {
          if (err) res.send(err);

          // return a message
          res.json({ message: 'Rating updated!' });
        });
  });
}

//||||||||||||||||||||||||||--
// DELETE RATING
//||||||||||||||||||||||||||--
function ratingDelete(req, res) {
  Rating.remove({
        _id: req.params.rating_id
      }, function(err, rating) {
        if (err) res.send(err);

        res.json({ message: 'Rating deleted' });
  });
}

//||||||||||||||||||||||||||--
// EXPORT RATINGS CONTROLLER
//||||||||||||||||||||||||||--
module.exports = ratingsController;
