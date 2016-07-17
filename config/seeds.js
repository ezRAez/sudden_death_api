var mongoose = require('./database');

var User = require('../models/user');
var Spot = require('../models/spot');

var newUsers = [
  { // 0
    name:      "Bob Neverdunk",
    userName:  "DunkLord",
    password:  "abc123",
    email:     "bob@email.com",
    zip:       "90026",
    sex:       "M",
    height:    72,
    represent: "I'm a dream dunker",
    picture:   "http://familysporthealth.com/wp-content/uploads/2015/06/dunking-basketball-200x300.jpg"
  },
  { // 1
    name:      "George Futz",
    userName:  "Futzy123",
    password:  "abc123",
    email:     "futz@email.com",
    zip:       "90026",
    sex:       "M",
    height:    72,
    represent: "I'm building a wall around the rim!",
    picture:   "http://farm7.static.flickr.com/6134/6019818254_8401c6b10b.jpg"
  },
  { // 2
    name:      "Boris Meow",
    userName:  "MeowMeowMeow",
    password:  "abc123",
    email:     "meow@email.com",
    zip:       "90026",
    sex:       "M",
    height:    72,
    represent: "I'm a little heavy, but damn can I move.",
    picture:   "https://i.ytimg.com/vi/B1qPRmud8hk/hqdefault.jpg"
  },
  { // 3
    name:      "Penny Pencilman",
    userName:  "DimeDroppin",
    password:  "abc123",
    email:     "penny@email.com",
    zip:       "90026",
    sex:       "M",
    height:    72,
    represent: "I'm on the knicks! Who knew I could play for such a prestigious baskeball team!?",
    picture:   "http://www.devtome.com/lib/exe/fetch.php?media=fat.jpg"
  },
  { // 4
    name:      "Dani Funnelcakes",
    userName:  "FunCake",
    password:  "abc123",
    email:     "dani@email.com",
    zip:       "90026",
    sex:       "F",
    height:    65,
    represent: "I'm a triumphant woman!",
    picture:   "http://www.csc.edu/news/highrez/1326837036.jpg"
  },
  { // 5
    name:      "Steph Strongheart",
    userName:  "Heartstrong",
    password:  "abc123",
    email:     "steph@email.com",
    zip:       "90026",
    sex:       "F",
    height:    65,
    represent: "Heart is what counts!",
    picture:   "https://s-media-cache-ak0.pinimg.com/236x/b3/9b/d6/b39bd61bc77d8e7d5e7a2765fc1b5768.jpg"
  }
];

var newSpots = [
    { // 0
      name:    "Bellevue Rec Center",
      latlong: [34.084229, -118.282634],
      address: "826 Lucile Ave, Los Angeles, CA 90026",
      indoor:  true
    },
    { // 1
      name:    "Dickerson Employee Benefits",
      latlong: [34.097123, -118.246672],
      address: "1918 Riverside Dr, Los Angeles, CA 90039",
      indoor:  false
    },
    { // 2
      name:    "GLASSELL PARK RECREATION CENTER",
      latlong: [34.115896, -118.233634],
      address: "3650 Verdugo Rd., Los Angeles, CA 90065",
      indoor:  false
    },
];



User.remove({}, function(err) {
  if (err) console.log(err);
  Spot.remove({}, function (err) {
    if (err) console.log(err);
    Spot.create(newSpots, function(err, spots) {
      if (err) console.log(err);

      User.create(newUsers, function(err, users) {
        if (err) {
          console.log(err);
        } else {
          console.log("Database seeded with " + users.length  + " users.");
          mongoose.connection.close();
        }
        process.exit();
      });
    });
  });
});
