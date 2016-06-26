var mongoose = require('./database');

var User = require('../models/user');

var users = [
  { // 0
    name:          "Bob Neverdunk",
    userName:      "DunkLord",
    password:      "abc123",
    email:         "bob@email.com",
    zip:           "90026",
    height:        72,
    represent:     "I'm a dream dunker",
    wins:          7,
    losses:        32,
    outsideO:      44,
    insideO:       78,
    defense:       45,
    sportsmanship: 88
  },
  { // 1
    handle: "MoneyMarge",
    name:   "Margaret Kalanchoe"
  }
];

var UserSchema = new mongoose.Schema({
  name:          { type: String, required: true },
  userName:      { type: String, required: true, index: { unique: true }},
  password:      { type: String, required: true, select: false },
  email:         { type: String, required: true },
  zip:           { type: String, required: true },
  height:        { type: Number, required: true },
  represent:     { type: String, required: true },
  picture:       { type: String, required: true },
  respect:       { type: Number, default: 1 },
  wins:          { type: Number, default: 0 },
  losses:        { type: Number, default: 0 },
  forfeits:      { type: Number, default: 0 },
  outsideO:      { type: Number, default: 0 },
  insideO:       { type: Number, default: 0 },
  defense:       { type: Number, default: 0 },
  sportsmanship: { type: Number, default: 0 }
});

User.remove({}, function(err) {
  if (err) console.log(err);
  User.create(users, function(err, users) {
    if (err) {
      console.log(err);
    } else {
      console.log("Database seeded with " + users.length  + " users.");
      mongoose.connection.close();
    }
    process.exit();
  });
});
