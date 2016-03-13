var mongoose = require('mongoose'),
    User = require('./user.js');

var RatingSchema = new mongoose.Schema({
  judge:          {
                     type:     mongoose.Schema.Types.ObjectId,
                     ref:      'User',
                     required: true
                  },
  rated:          {
                     type:     mongoose.Schema.Types.ObjectId,
                     ref:      'User',
                     required: true
                  },
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

var Rating = mongoose.model('Rating', RatingSchema);

module.exports = Rating;
