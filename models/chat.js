var mongoose = require('mongoose'),
    User = require('./user.js'),
    Game = require('./game.js');

var ChatSchema = new mongoose.Schema({
  sender:   {
              type:     mongoose.Schema.Types.ObjectId,
              ref:      'User',
              required: true
            },
  game:     {
              type:     mongoose.Schema.Types.ObjectId,
              ref:      'Game',
              required: true
            },
  content:  { type: String, validate: [checkLength, "Messages must be shorter \
                                                     than 180 characters."] },
  read:     Boolean,
  sent:     Date
});

function checkLength(str) {
  return str.length > 0 && str.length < 180;
}

var Chat = mongoose.model('Chat', ChatSchema);

module.exports = Chat;
