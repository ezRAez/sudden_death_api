// Require resource's model(s) and dependencies.
var User        = require("../models/user"),
    bcrypt      = require('bcrypt-nodejs'),
    jwt         = require('jsonwebtoken'),
    env         = require('../config/environment'),
    superSecret = env.SECRET;

//||||||||||||||||||||||||||--
// EXPORT USERS CONTROLLER
//||||||||||||||||||||||||||--
module.exports = { index, show, create, update, destroy };

//||||||||||||||||||||||||||--
// GET USERS - USER INDEX
//||||||||||||||||||||||||||--
function index(req, res) {
  User.find({}, function(err, users) {
        if (err) res.send(err);

        // return the users
        res.json(users);
  });
}

//||||||||||||||||||||||||||--
// GET USER - USER SHOW
//||||||||||||||||||||||||||--
function show(req, res) {
  User.findById(req.params.user_id, function(err, user) {
        if (err) res.send(err);

        // return that user
        res.json(user);
  });
};

//||||||||||||||||||||||||||--
// CREATE USER
//||||||||||||||||||||||||||--
function create(req, res) {
    var newUser          = new User();
    newUser.name         = req.body.name;
    newUser.userName     = req.body.userName;
    newUser.password     = req.body.password;
    newUser.email        = req.body.email;
    newUser.sex          = req.body.sex;
    newUser.opponentPref = req.body.opponentPref;
    newUser.zip          = req.body.zip;
    newUser.height       = req.body.height;
    newUser.represent    = req.body.represent;
    newUser.picture      = req.body.picture;

    newUser.save(function(err, user) {
        if (err) {
          // duplicate entry
          if (err.code == 11000)
            return res.json({ success: false,
                              message: 'That username is taken!'});
          else
            return res.json(err);
        }

        var token = jwt.sign({
          _id:            user._id,
          name:           user.name,
          userName:       user.userName,
          email:          user.email,
          zip:            user.zip,
          sex:            user.sex,
          opponentPref:   user.opponentPref,
          height:         user.height,
          represent:      user.represent,
          picture:        user.picture,
          respect:        user.respect,
          wins:           user.wins,
          losses:         user.losses,
          forfeits:       user.forfeits,
          outsideO:       user.outsideO,
          insideO:        user.insideO,
          defense:        user.defense,
          sportsmanship:  user.sportsmanship
        }, superSecret, {
          expiresIn:      2592000 // expires in 30 days
        });

        // return a message
        res.json({
          success: true,
          message: "Prepare for Sudden Death!",
          token,
          user
        });
      });

};

//||||||||||||||||||||||||||--
// UPDATE USER
//||||||||||||||||||||||||||--
function update(req, res) {
  User.findById(req.params.user_id, function(err, user) {
    if (err) res.json(err);

    // set the new user information if it exists in the request
    for (var k in req.body) {
      if (user[k]) {
        user[k] = req.body[k];
      }
    }

    // save the user
    user.save(function(err, user) {
      if (err) res.json(err);

      var token = jwt.sign({
              _id:            user._id,
              name:           user.name,
              userName:       user.userName,
              email:          user.email,
              zip:            user.zip,
              sex:            user.sex,
              opponentPref:   user.opponentPref,
              height:         user.height,
              represent:      user.represent,
              picture:        user.picture,
              respect:        user.respect,
              wins:           user.wins,
              losses:         user.losses,
              forfeits:       user.forfeits,
              outsideO:       user.outsideO,
              insideO:        user.insideO,
              defense:        user.defense,
              sportsmanship:  user.sportsmanship
            }, superSecret, {
              expiresIn:      2592000 // expires in 30 days
            });

      // return a message
      res.json({
        success: true,
        message: 'User updated!',
        user,
        token
      });
    });
  });
}

//||||||||||||||||||||||||||--
// DELETE USER
//||||||||||||||||||||||||||--
function destroy(req, res) {
  User.remove({
        _id: req.params.user_id
      }, function(err, user) {
        if (err) res.send(err);

        res.json({ message: 'Successfully deleted' });
  });
}



