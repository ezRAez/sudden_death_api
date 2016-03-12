var mongoose = require('mongoose');

var SpotSchema = new mongoose.Schema({
  name:      { type: String, required: true },
  latitude:  { type: Number, required: true },
  longitude: { type: Number, required: true },
  address:   { type: String, required: false},
  indoor:    { type: Boolean, required: false}
});

var Spot = mongoose.model('Spot', SpotSchema);

module.exports = Spot;
