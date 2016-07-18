var mongoose = require('mongoose');

var SpotSchema = new mongoose.Schema({
  name:    { type: String, required: true },
  latlng:  {
               type:     [Number],
               required: true,
               index:    '2d'
           },
  address: { type: String, required: true  },
  indoor:  { type: Boolean }
});

var Spot = mongoose.model('Spot', SpotSchema);

module.exports = Spot;
