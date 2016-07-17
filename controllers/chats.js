// Require resource's model(s).
var Game = require("../models/game"),
    User = require("../models/user");

//||||||||||||||||||||||||||--
// EXPORT CHAT CONTROLLER
//||||||||||||||||||||||||||--
module.exports = {
  index:   index,
  create:  create,
  update:  update,
  destroy: destroy
};


function index(req, res) {
  res.json({ message: "Not set up yet!", success: false });
};

function create(req, res) {
  res.json({ message: "Not set up yet!", success: false });
};

function update(req, res) {
  res.json({ message: "Not set up yet!", success: false });
};

function destroy(req, res) {
  res.json({ message: "Not set up yet!", success: false });
};
