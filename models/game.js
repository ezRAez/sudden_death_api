var mongoose = require('mongoose'),
    User = require('./user.js'),
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
                enum:     ['pending', 'accepted', 'complete']
             },
  winner_id: {
                type:     mongoose.Schema.Types.ObjectId,
                ref:      'User'
             },
  location:  {
                type:     mongoose.Schema.Types.ObjectId,
                ref:      'Spot'
             },
  time:                   Date
});



var Game = mongoose.model('Game', GameSchema);

module.exports = Game;
