// Require resource's model(s).
var Rating        = require("../models/rating");

var ratingsController = {
  ratingIndex:   ratingIndex,
  ratingShow:    ratingShow,
  ratingCreate:  ratingCreate,
  ratingUpdate:  ratingUpdate,
  ratingDelete:  ratingDelete,
  ratingsWithin: ratingsWithin,
};

//||||||||||||||||||||||||||--
// GET ratingS - rating INDEX
//||||||||||||||||||||||||||--
function ratingIndex(req, res) {
  Rating.find({}, function(err, ratings) {
        if (err) res.send(err);

        // return the ratings
        res.json(ratings);
  });
}

//||||||||||||||||||||||||||--
// GET rating - rating SHOW
//||||||||||||||||||||||||||--
function ratingShow(req, res) {
  Rating.findById(req.params.rating_id, function(err, rating) {
        if (err) res.send(err);

        // return that rating
        res.json(rating);
  });
};

//||||||||||||||||||||||||||--
// CREATE rating
//||||||||||||||||||||||||||--
function ratingCreate(req, res) {
    var rating   = new Rating(req.body);
    rating.rated = req.params.rated_id;

    rating.save(function(err) {
        if (err) {
            return res.json(err);
        }

        // return a message
        res.json({ message: "Rating created." });
      });

};

//||||||||||||||||||||||||||--
// UPDATE rating
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
// DELETE rating
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
