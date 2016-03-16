var mongoose = require('mongoose'),
    User = require('./user.js'),
    Rating = require('./rating.js'),
    Spot = require('./spot.js');

var GameSchema = new mongoose.Schema({
  player1:   {
                type:     mongoose.Schema.Types.ObjectId,
                ref:      'User',
                required: true
             },
  player2:   {
                type:     mongoose.Schema.Types.ObjectId,
                ref:      'User',
                required: true
             },
  status:    {
                type:     String,
                enum:     ['pending', 'accepted', 'complete', 'rejected']
             },
  winner_id: {
                type:     mongoose.Schema.Types.ObjectId,
                ref:      'User'
             },
  location:  {
                type:     mongoose.Schema.Types.ObjectId,
                ref:      'Spot'
             },
  p1rating:               [ Rating.schema ],
  p2rating:               [ Rating.schema ],
  time:                   Date
});



var Game = mongoose.model('Game', GameSchema);

module.exports = Game;
