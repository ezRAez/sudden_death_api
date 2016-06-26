var mongoose = require('./database');

var User = require('../models/user');

var users = [
  { // 0
    name:      "Bob Neverdunk",
    userName:  "DunkLord",
    password:  "abc123",
    email:     "bob@email.com",
    zip:       "90026",
    height:    72,
    represent: "I'm a dream dunker",
    picture:   "http://familysporthealth.com/wp-content/uploads/2015/06/dunking-basketball-200x300.jpg"
  }
];

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
