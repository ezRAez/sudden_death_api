var mongoose = require('mongoose'),
    User = require('./user.js');

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
  status:    { type: Number, required: true },
  winner_id: { type: Number, required: true },
  location:  { type: Number, required: true },
  time:      { type: Number, required: true },
});



var Rating = mongoose.model('Rating', RatingSchema);

module.exports = Rating;
