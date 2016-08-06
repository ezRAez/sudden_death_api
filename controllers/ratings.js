// Require resource's model(s).
var Game = require("../models/game"),
    User = require("../models/user");

//||||||||||||||||||||||||||--
// EXPORT RATINGS CONTROLLER
//||||||||||||||||||||||||||--
module.exports = { index, show, create, update, destroy };

//|||||||||||||||||||||||||||||||--
// GET RATINGS - RATINGS INDEX FOR USER
//|||||||||||||||||||||||||||||||--
function index(req, res) {
  Game.find({$or: [
    {player1: req.params.user_id},
    {player2: req.params.user_id}
  ]}).populate(['player1', 'player2']).exec(function(err, games){
    "use strict";
    if (err) res.send(err);

    console.log("GAME AMOUNT", games.length);

    let ratings = [];
    games.forEach(function(game) {
      let p1Id = game.player1._id.toString(),
          p2Id = game.player2._id.toString();
      if (p1Id === req.params.user_id && game.p1rating[0]) {
        ratings.push(game.p1rating[0]);
      } else if (p2Id === req.params.user_id && game.p2rating[0]) {
        ratings.push(game.p2rating[0])
      }
    });

    res.json(ratings);
  });
};

//||||||||||||||||||||||||||--
// GET RATING - SHOW RATING
//||||||||||||||||||||||||||--
function show(req, res) {
  Game.findById(req.params.game_id, function(err, game) {
    if (err) res.send(err);
    var rating;
    if (game.p1rating[0]._id.toString() === req.params.rating_id) rating = game.p1rating[0];
    if (game.p2rating[0]._id.toString() === req.params.rating_id) rating = game.p2rating[0];
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

    if (req.params.user_id === game.player1.toString()) {
      game.p2rating.push(rating);
      game.save(function(err, game) {
        if (err) res.json({err, success: false });
        res.json({ success: true, message: "Rating created.", game: game });
      });
    } else if (req.params.user_id === game.player2.toString()) {
      game.p1rating.push(rating);
      game.save(function(err, game) {
        if (err) res.json({err, success: false });
        res.json({ success: true, message: "Rating created.", game: game });
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

    if (game.p1rating[0]._id.toString() === req.params.rating_id) {
      if (req.body.insideO !== undefined)       game.p1rating[0].insideO       = req.body.insideO;
      if (req.body.outsideO !== undefined)      game.p1rating[0].outsideO      = req.body.outsideO;
      if (req.body.defense !== undefined)       game.p1rating[0].defense       = req.body.defense;
      if (req.body.sportsmanship !== undefined) game.p1rating[0].sportsmanship = req.body.sportsmanship;
      if (req.body.comment)                     game.p1rating[0].comment       = req.body.comment;
    } else if (game.p2rating[0]._id.toString() === req.params.rating_id) {
      if (req.body.insideO !== undefined)       game.p2rating[0].insideO       = req.body.insideO;
      if (req.body.outsideO !== undefined)      game.p2rating[0].outsideO      = req.body.outsideO;
      if (req.body.defense !== undefined)       game.p2rating[0].defense       = req.body.defense;
      if (req.body.sportsmanship !== undefined) game.p2rating[0].sportsmanship = req.body.sportsmanship;
      if (req.body.comment)                     game.p2rating[0].comment       = req.body.comment;
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
    var par = req.params;
    var sendReq = true;
    var notFound = true;


    if (game.player2.toString() === par.user_id) {
      if (game.p1rating[0] && par.rating_id === game.p1rating[0]._id.toString()) {
        game.p1rating.pull(par.rating_id);
        notFound = false;
      } else {
        sendReq = false, notFound = false;
        res.json({ msg: "You can't delete your own Rating!", game: game} );
      }
    } else if (game.player1.toString() === par.user_id) {
       if (game.p2rating[0] && par.rating_id === game.p2rating[0]._id.toString()) {
        game.p2rating.pull(par.rating_id);
        notFound = false;
      } else {
        sendReq = false, notFound = false;
        res.json({ msg: "You can't delete your own Rating!", game: game} );
      }
    }

    if (notFound) {
      res.json({ msg: "No such rating." });
    } else if (sendReq) {
      game.save(function(err, game) {
        if (err) res.send(err);

        res.json({ msg: "Rating deleted.", game: game });
      });
    }
  });
}
