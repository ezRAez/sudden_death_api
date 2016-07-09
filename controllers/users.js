// Require resource's model(s).
var User        = require("../models/user"),
    bcrypt      = require('bcrypt-nodejs'),
    jwt         = require('jsonwebtoken'),
    env         = require('../config/environment'),
    superSecret = env.SECRET;

var usersController = {
  userIndex:   userIndex,
  userShow:    userShow,
  userCreate:  userCreate,
  userUpdate:  userUpdate,
  userDelete:  userDelete,
  userAuth:    userAuth,
  tokenVerify: tokenVerify,
  decodeToken: decodeToken
};

//||||||||||||||||||||||||||--
// GET USERS - USER INDEX
//||||||||||||||||||||||||||--
function userIndex(req, res) {
  User.find({}, function(err, users) {
        if (err) res.send(err);

        // return the users
        res.json(users);
  });
}

//||||||||||||||||||||||||||--
// GET USER - USER SHOW
//||||||||||||||||||||||||||--
function userShow(req, res) {
  User.findById(req.params.user_id, function(err, user) {
        if (err) res.send(err);

        // return that user
        res.json(user);
  });
};

//||||||||||||||||||||||||||--
// CREATE USER
//||||||||||||||||||||||||||--
function userCreate(req, res) {
    var user          = new User();
    user.name         = req.body.name;
    user.userName     = req.body.userName;
    user.password     = req.body.password;
    user.email        = req.body.email;
    user.zip          = req.body.zip;
    user.height       = req.body.height;
    user.represent    = req.body.represent;
    user.picture      = req.body.picture;


    user.save(function(err) {
        if (err) {
          // duplicate entry
          if (err.code == 11000)
            return res.json({ success: false,
                              message: 'That username is taken!'});
          else
            return res.json(err);
        }

        // return a message
        res.json({ message: "Prepare for Sudden Death!" });
      });

};

//||||||||||||||||||||||||||--
// UPDATE USER
//||||||||||||||||||||||||||--
function userUpdate(req, res) {
  User.findById(req.params.user_id, function(err, user) {
    console.log(user, req.body.name);
    if (err) res.json(err);

    // set the new user information if it exists in the request
    if (req.body.name)          user.name          = req.body.name;
    if (req.body.userName)      user.userName      = req.body.userName;
    if (req.body.password)      user.password      = req.body.password;
    if (req.body.email)         user.email         = req.body.email;
    if (req.body.zip)           user.zip           = req.body.zip;
    if (req.body.height)        user.height        = req.body.height;
    if (req.body.represent)     user.represent     = req.body.represent;
    if (req.body.picture)       user.picture       = req.body.picture;
    if (req.body.respect)       user.respect       = req.body.respect;
    if (req.body.wins)          user.wins          = req.body.wins;
    if (req.body.losses)        user.losses        = req.body.losses;
    if (req.body.forfeits)      user.forfeits      = req.body.forfeits;
    if (req.body.outsideO)      user.outsideO      = req.body.outsideO;
    if (req.body.insideO)       user.insideO       = req.body.insideO;
    if (req.body.defense)       user.defense       = req.body.defense;
    if (req.body.sportsmanship) user.sportsmanship = req.body.sportsmanship;

    // save the user
    user.save(function(err, user) {
      if (err) res.json(err);

      // return a message
      res.json({ message: 'User updated!', user });
    });
  });
}

//||||||||||||||||||||||||||--
// DELETE USER
//||||||||||||||||||||||||||--
function userDelete(req, res) {
  User.remove({
        _id: req.params.user_id
      }, function(err, user) {
        if (err) res.send(err);

        res.json({ message: 'Successfully deleted' });
  });
}

//||||||||||||||||||||||||||--
// AUTHENTICATE USER
//||||||||||||||||||||||||||--
function userAuth(req, res, next) {
  // find the user
  User.findOne({
      userName: req.body.userName
    }).select('_id userName name email password zip height represent picture respect wins losses forfeits outsideO insideO defense sportsmanship')
      .exec(function(err, user) {

      if (err) throw err;

      // no user with that username was found
        if (!user) {
          res.json({
            success: false,
            message: 'Authentication failed. User not found.'
          });
        } else if (user) {

          // check if password matches
          var validPassword = user.comparePassword(req.body.password);
          if (!validPassword) {
            res.json({
              success: false,
              message: 'Authentication failed. Wrong password.'
            });
          } else {

            // if user is found and password is right
            // create a token
            var token = jwt.sign({
              _id:            user._id,
              name:           user.name,
              userName:       user.userName,
              email:          user.email,
              zip:            user.zip,
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

            // return the information including token as JSON
            res.json({
              success: true,
              message: 'Enjoy your token!',
              token: token,
              user: user
            });
          }

        }

    });
  };

//||||||||||||||||||||||||||--
// VERIFIY TOKEN
//||||||||||||||||||||||||||--
function tokenVerify(req, res, next) {
  // do logging
  console.log('Somebody just accessed the JAMN API!');

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, superSecret, function(err, decoded) {

      if (err) {
        res.status(403).send({
          success: false,
          message: 'Failed to authenticate token.'
      });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;

        next(); // make sure we go to the next routes and don't stop here
      }
    });

  } else {

    // if there is no token
    // return an HTTP response of 403 (access forbidden) and an error message
    res.status(403).send({
      success: false,
      message: 'No token provided.'
    });

  }
};

//||||||||||||||||||||||||||--
// SEND THE DECODED TOKEN
//||||||||||||||||||||||||||--
function decodeToken(req, res) {
  res.send(req.decoded);
};

//||||||||||||||||||||||||||--
// EXPORT USERS CONTROLLER
//||||||||||||||||||||||||||--
module.exports = usersController;
