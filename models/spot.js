var mongoose = require('mongoose');

var SpotSchema = new mongoose.Schema({
  name:    { type: String, required: true },
  lonlat:  {
               type:     [Number],
               required: true,
               index:    '2d'
           },
  address: { type: String, required: false},
  indoor:  { type: Boolean, required: false}
});

var Spot = mongoose.model('Spot', SpotSchema);

module.exports = Spot;
