// Require resource's model(s).
var User        = require("../models/user"),
    bcrypt      = require('bcrypt-nodejs'),
    jwt         = require('jsonwebtoken'),
    env         = require('../config/environment'),
    superSecret = env.SECRET;

// EXPORT MODULE
module.exports = { userAuth, tokenVerify, decodeToken };

//||||||||||||||||||||||||||--
// AUTHENTICATE USER
//||||||||||||||||||||||||||--
function userAuth(req, res, next) {
  // find the user
  User.findOne({
      userName: req.body.userName
    }).select('userName name email password zip height represent picture respect wins losses forfeits outsideO insideO defense sportsmanship')
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
