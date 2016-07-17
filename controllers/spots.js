// Require resource's model(s).
var Spot        = require("../models/spot");

var spotsController = {
  spotIndex:   spotIndex,
  spotShow:    spotShow,
  spotCreate:  spotCreate,
  spotUpdate:  spotUpdate,
  spotDelete:  spotDelete,
  spotsWithin: spotsWithin,
};

//||||||||||||||||||||||||||--
// GET SPOTS - SPOT INDEX
//||||||||||||||||||||||||||--
function spotIndex(req, res) {
  Spot.find({}, function(err, spots) {
        if (err) res.send(err);

        // return the spots
        res.json(spots);
  });
}

//||||||||||||||||||||||||||--
// GET SPOT - SPOT SHOW
//||||||||||||||||||||||||||--
function spotShow(req, res) {
  Spot.findById(req.params.spot_id, function(err, spot) {
        if (err) res.send(err);

        // return that spot
        res.json(spot);
  });
};

//||||||||||||||||||||||||||--
// CREATE SPOT
//||||||||||||||||||||||||||--
function spotCreate(req, res) {
    var spot          = new Spot();
    spot.name         = req.body.name;
    spot.latlong      = [req.body.latitude, req.body.longitude];
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
// UPDATE SPOT
//||||||||||||||||||||||||||--
function spotUpdate(req, res) {
  Spot.findById(req.params.spot_id, function(err, spot) {

        if (err) res.send(err);

        // set the new spot information if it exists in the request
        if (req.body.name)       spot.name      = req.body.name;
        if (req.body.latitude && req.body.longitude) {
          spot.latlong = [req.body.latitude, req.body.longitude];
        }
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
// DELETE SPOT
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
// FIND SPOT WITHIN
//||||||||||||||||||||||||||--
function spotsWithin(req, res) {

  // Get miles from query, or default to 10
  var miles = req.query.miles || 10;
  var distance =  miles / 3963.2;

  var query = Spot.find({'latlong': {
      $near: [
        req.query.lat,
        req.query.lon
      ],
      $maxDistance: distance
      }
    });

  query.exec(function (err, spots) {
    if (err) {
      console.log(err);
      res.send(err);
    }
    if (!spots) {
      res.json({'msg': 'No Spots found.'});
    }
    if (spots) {
      res.json(spots);
    }
  });

}

//||||||||||||||||||||||||||--
// EXPORT SPOTS CONTROLLER
//||||||||||||||||||||||||||--
module.exports = spotsController;
