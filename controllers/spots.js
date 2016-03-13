// Require resource's model(s).
var Spot        = require("../models/spot");

var spotsController = {
  spotIndex:   spotIndex,
  spotShow:    spotShow,
  spotCreate:  spotCreate,
  spotUpdate:  spotUpdate,
  spotDelete:  spotDelete,
};

//||||||||||||||||||||||||||--
// GET spotS - spot INDEX
//||||||||||||||||||||||||||--
function spotIndex(req, res) {
  Spot.find({}, function(err, spots) {
        if (err) res.send(err);

        // return the spots
        res.json(spots);
  });
}

//||||||||||||||||||||||||||--
// GET spot - spot SHOW
//||||||||||||||||||||||||||--
function spotShow(req, res) {
  Spot.findById(req.params.spot_id, function(err, spot) {
        if (err) res.send(err);

        // return that spot
        res.json(spot);
  });
};

//||||||||||||||||||||||||||--
// CREATE spot
//||||||||||||||||||||||||||--
function spotCreate(req, res) {
    var spot          = new Spot();
    spot.name         = req.body.name;
    spot.latitude     = req.body.latitude;
    spot.longitude    = req.body.longitude;
    spot.address      = req.body.address;
    spot.indoor       = req.body.indoor;

    spot.save(function(err) {
        if (err) {
            return res.json(err);
        }

        // return a message
        res.json({ message: "Spot created." });
      });

};

//||||||||||||||||||||||||||--
// UPDATE spot
//||||||||||||||||||||||||||--
function spotUpdate(req, res) {
  Spot.findById(req.params.spot_id, function(err, spot) {

        if (err) res.send(err);

        // set the new spot information if it exists in the request
        if (req.body.name)       spot.name      = req.body.name;
        if (req.body.latitude)   spot.latitude  = req.body.latitude;
        if (req.body.longitude)  spot.longitude = req.body.longitude;
        if (req.body.address)    spot.address   = req.body.address;
        if (req.body.indoor)     spot.indoor    = req.body.indoor;

        // save the spot
        spot.save(function(err) {
          if (err) res.send(err);

          // return a message
          res.json({ message: 'Spot updated!' });
        });
  });
}

//||||||||||||||||||||||||||--
// DELETE spot
//||||||||||||||||||||||||||--
function spotDelete(req, res) {
  Spot.remove({
        _id: req.params.spot_id
      }, function(err, spot) {
        if (err) res.send(err);

        res.json({ message: 'Spot deleted' });
  });
}

//||||||||||||||||||||||||||--
// EXPORT spotS CONTROLLER
//||||||||||||||||||||||||||--
module.exports = spotsController;
