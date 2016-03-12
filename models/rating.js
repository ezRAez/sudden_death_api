var mongoose = require('mongoose'),
    User = require('./user.js');

var RatingSchema = new mongoose.Schema({
  judge:          {
                     type:     mongoose.Schema.Types.ObjectId,
                     ref:      'User',
                     required: true
                  },
  insideO:        { type: Number, required: true },
  outsideO:       { type: Number, required: true },
  defense:        { type: Number, required: true },
  sportsmanship:  { type: Number, required: true },
  comment:        { type: String, required: true }
});



var Rating = mongoose.model('Rating', RatingSchema);

module.exports = Rating;
