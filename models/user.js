var mongoose = require('mongoose'),
    bcrypt   = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
  name:          { type: String, required: true }, // needs length validations
  userName:      { type: String, required: true, index: { unique: true }}, // needs length validations
  password:      { type: String, required: true, select: false }, // needs security and length validations
  email:         { type: String, required: true }, // needs regex to check if its a valid email
  zip:           { type: String, required: true },
  height:        { type: Number, required: true },
  represent:     { type: String },
  sex:           { type: String, required: true },
  picture:       { type: String },
  opponentPref:  {
                   type: String,
                   required: true,
                   default: 'A',
                   enum: ['M', 'F', 'A']
                 },
  respect:       { type: Number, default: 1 },
  wins:          { type: Number, default: 0 },
  losses:        { type: Number, default: 0 },
  forfeits:      { type: Number, default: 0 },
  outsideO:      { type: Number, default: 0 },
  insideO:       { type: Number, default: 0 },
  defense:       { type: Number, default: 0 },
  sportsmanship: { type: Number, default: 0 }
});

// hash the password before the user is saved
UserSchema.pre('save', function(next) {
  var user = this;

  // hash the password only if the password has been changed or user is new
  if (!user.isModified('password')) return next();

  // generate the hash
  bcrypt.hash(user.password, null, null, function(err, hash) {
    if (err) return next(err);

    // change the password to the hashed version
    user.password = hash;
    next();
  });
});

// method to compare a given password with the database hash
UserSchema.methods.comparePassword = function(password) {
  var user = this;

  return bcrypt.compareSync(password, user.password);
};

var User = mongoose.model('User', UserSchema);

module.exports = User;
