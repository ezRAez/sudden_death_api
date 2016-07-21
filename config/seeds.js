var mongoose = require('./database');

var User = require('../models/user');
var Spot = require('../models/spot');
var Game = require('../models/game');

var newUsers = [
  { // 0
    name:         "Bob Neverdunk",
    userName:     "DunkLord",
    password:     "abc123",
    email:        "bob@email.com",
    zip:          "90026",
    sex:          "M",
    opponentPref: "A",
    height:       72,
    represent:    "I'm a dream dunker",
    picture:      "http://familysporthealth.com/wp-content/uploads/2015/06/dunking-basketball-200x300.jpg"
  },
  { // 1
    name:         "George Futz",
    userName:     "Futzy123",
    password:     "abc123",
    email:        "futz@email.com",
    zip:          "90026",
    sex:          "M",
    opponentPref: "A",
    height:       72,
    represent:    "I'm building a wall around the rim!",
    picture:      "http://farm7.static.flickr.com/6134/6019818254_8401c6b10b.jpg"
  },
  { // 2
    name:         "Boris Meow",
    userName:     "MeowMeowMeow",
    password:     "abc123",
    email:        "meow@email.com",
    zip:          "90026",
    sex:          "M",
    opponentPref: "A",
    height:       72,
    represent:    "I'm a little heavy, but damn can I move.",
    picture:      "https://i.ytimg.com/vi/B1qPRmud8hk/hqdefault.jpg"
  },
  { // 3
    name:         "Penny Pencilman",
    userName:     "DimeDroppin",
    password:     "abc123",
    email:        "penny@email.com",
    zip:          "90026",
    sex:          "M",
    opponentPref: "M",
    height:       72,
    represent:    "I'm on the knicks! Who knew I could play for such a prestigious baskeball team!?",
    picture:      "http://www.devtome.com/lib/exe/fetch.php?media=fat.jpg"
  },
  { // 4
    name:         "Dani Funnelcakes",
    userName:     "FunCake",
    password:     "abc123",
    email:        "dani@email.com",
    zip:          "90026",
    sex:          "F",
    opponentPref: "F",
    height:       65,
    represent:    "I'm a triumphant woman!",
    picture:      "http://www.csc.edu/news/highrez/1326837036.jpg"
  },
  { // 5
    name:         "Steph Strongheart",
    userName:     "Heartstrong",
    password:     "abc123",
    email:        "steph@email.com",
    zip:          "90026",
    sex:          "F",
    opponentPref: "A",
    height:       65,
    represent:    "Heart is what counts!",
    picture:      "https://s-media-cache-ak0.pinimg.com/236x/b3/9b/d6/b39bd61bc77d8e7d5e7a2765fc1b5768.jpg"
  }
];

var newSpots = [
    { // 0
      name:    "Bellevue Rec Center",
      latlng:  [34.084229, -118.282634],
      address: "826 Lucile Ave, Los Angeles, CA 90026",
      indoor:  true
    },
    { // 1
      name:    "Dickerson Employee Benefits",
      latlng:  [34.097123, -118.246672],
      address: "1918 Riverside Dr, Los Angeles, CA 90039",
      indoor:  false
    },
    { // 2
      name:    "Glassell Park Recreation Center",
      latlng:  [34.115896, -118.233634],
      address: "3650 Verdugo Rd., Los Angeles, CA 90065",
      indoor:  false
    }
];


Game.remove({}, function(err) {
  if (err) console.log(err);
  User.remove({}, function(err) {
    if (err) console.log(err);
    Spot.remove({}, function (err) {
      if (err) console.log(err);
      Spot.create(newSpots, function(err, spots) {
        if (err) console.log(err);
        User.create(newUsers, function(err, users) {
          if (err) console.log(err);

          var newGames = [
            { // 0
              player1:   users[1],
              player2:   users[0],
              status:    "completed",
              spot:      spots[0],
              time:      new Date(2016, 4, 17),
              winner_id: users[0],
              p1rating:  [
                {
                  insideO:       77,
                  outsideO:      45,
                  defense:       67,
                  sportsmanship: 100,
                  comment:       "Such a nice dude. He burns you on those threes though."
                }
              ],
              p2rating:  [
                {
                  insideO:       65,
                  outsideO:      24,
                  defense:       35,
                  sportsmanship: 100,
                  comment:       "Needs to work on his outside defense. Leaves you open for three."
                }
              ]
            },
            { // 1
              player1:   users[1],
              player2:   users[2],
              status:    "accepted",
              spot:      spots[1],
              time:      new Date(2016, 9, 22)
            },
            { // 2
              player1:   users[3],
              player2:   users[4],
              status:    "rejected"
            },
            { // 3
              player1:   users[5],
              player2:   users[4],
              status:    "pending"
            },
            { // 3
              player1:   users[5],
              player2:   users[2],
              status:    "completed",
              spot:      spots[2],
              time:      new Date(2016, 5, 15),
              winner_id: users[5],
              p1rating:  [
                {
                  insideO:       50,
                  outsideO:      88,
                  defense:       55,
                  sportsmanship: 75,
                  comment:       "She's really good. Made me feel bad about myself."
                }
              ],
              p2rating:  [
                {
                  insideO:       45,
                  outsideO:      10,
                  defense:       20,
                  sportsmanship: 80,
                  comment:       "He's a lil punk. Dropped him, easy."
                }
              ]
            }
          ];

          Game.create(newGames, function(err, games) {
            if (err) console.log(err);
            users.forEach(function(user, ind) {
              user.compileRecord();
            });
            console.log(`Database seeded with ${users.length} users, ${games.length} games, and ${spots.length} spots.`);
            // mongoose.connection.close();
            // process.exit();
          }); // Closes Game Create
        }); // Closes User Create
      }); // Closes Spot Create
    }); // Closes Spot Remove
  }); // Closes User Remove
}); // Closes Game Remove
