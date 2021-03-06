var mongoose = require('mongoose'),
    User     = require('./user.js'),
    Spot     = require('./spot.js');

var ratingSchema = new mongoose.Schema({
  insideO:        { type: Number, required: true },
  outsideO:       { type: Number, required: true },
  defense:        { type: Number, required: true },
  sportsmanship:  { type: Number, required: true },
  comment:        { type: String, validate: [checkLength, "Messages must be \
                                                           shorter than 180 \
                                                           characters."] }
});

var chatSchema = new mongoose.Schema({
  content:   {
               type: String,
               required: true,
               validate: [checkLength, "Messages must be shorter than 180 \
                                                             characters."]
             },
  read:      Boolean,
  createdAt: { type: Date, default: Date.now(), required: true}
});

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
                required: true,
                enum:     ['pending', 'accepted', 'completed', 'rejected']
             },
  winner_id: {
                type:     mongoose.Schema.Types.ObjectId,
                ref:      'User'
             },
  spot:      {
                type:     mongoose.Schema.Types.ObjectId,
                ref:      'Spot'
             },
  p1rating:  [ ratingSchema ],
  p2rating:  [ ratingSchema ],
  p1chats:   [ chatSchema ],
  p2chats:   [ chatSchema ],
  time:      Date
});

function checkLength(str) {
  return str.length > 0 && str.length < 180;
}

var Game = mongoose.model('Game', GameSchema);

module.exports = Game;
