var mongoose = require('mongoose'),
    Game = require('./game.js'),
    User = require('./user.js');

var ratingSchema = new mongoose.Schema({
  game:           [ Game.schema ],
  insideO:        { type: Number, required: true },
  outsideO:       { type: Number, required: true },
  defense:        { type: Number, required: true },
  sportsmanship:  { type: Number, required: true },
  comment:        { type: String, validate: [checkLength, "Messages must be \
                                                           shorter than 180 \
                                                           characters."] }
});

function checkLength(str) {
  return str.length > 0 && str.length < 180;
}

ratingSchema.methods.findUsers = function() {
  var p1Id = this.game[0].player1._id;
  var p2Id = this.game[0].player2._id;

  User.find({
    '_id': { $in: [p1Id, p2Id]}
  }, function(err, users) {
    console.log(users, " are coming in from the game!");
    return users;
  })
}

var Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;
