# [jamn_api](http://fast-chamber-70325.herokuapp.com/api)

##### Node/Express server for the phone app, __JAMN!__ @ http://fast-chamber-70325.herokuapp.com/api

---

### Models:

##### __User__: 

| Key           | Type    | Validations                   | Description                                                 | 
| :------------ | :------ | :---------------------------- | :---------------------------------------------------------- |
| name          | String  | required                      | First name of User.                                         |
| userName      | String  | required, unique              | Username - this is their unique indentifier for logging in. |
| password      | String  | required                      | Account password.                                           |
| email         | String  | required                      | Email for verification and updates.                         |
| zip           | String  | required                      | Used as central location for setting up matches.            |
| sex           | String  | required                      | Gender of user.                                             |
| opponentPref  | String  | required, enum: 'A', 'M', 'F' | Prefence for gender of opponent: all, male, or female.      |
| height        | Number  | required                      | In inches, how tall the user is.                            |
| picture       | String  | None                          | Url string for the user's profile image.                    |
| represent     | String  | None                          | Statement about yourself.                                   |
| respect       | Number  | None                          | The amount of acquired respect. Defaults to 1.              |
| wins          | Number  | None                          | Amount of total wins.                                       |
| losses        | Number  | None                          | Amount of total losses.                                     |
| forfeits      | Number  | None                          | Amount of total forfeits.                                   |
| outsideO      | Number  | None                          | Average outside offense for all given ratings.              |
| insideO       | Number  | None                          | Average inside offense for all given ratings.               |
| defense       | Number  | None                          | Average defense for all given ratings.                      |
| sportsmanship | Number  | None                          | Average sportsmanship for all given ratings.                |


##### __Spot__: 

| Key           | Type            | Validations | Description                                                 | 
| :------------ | :-------------- | :---------- | :---------------------------------------------------------- |
| name          | String          | required    | Location's name.                                            |
| latlng        | Array - Numbers | required    | The latitude (index 0) and longitude (index 1) in an array. |
| address       | String          | required    | Location's address.                                         |
| indoor        | Boolean         | None        | `true` if location is indoors.                              |


##### __Game__: 

| Key       | Type              | Validations                                                    | Description                                                                                                                                                                                                                                                    | 
| :-------- | :---------------- | :------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| player1   | ObjectId          | required                                                       | Reference to a User object as p1.                                                                                                                                                                                                                              |
| player2   | ObjectId          | required                                                       | Reference to a User object as p2.                                                                                                                                                                                                                              |
| status    | String            | required, enum: 'pending', 'accepted', 'completed', 'rejected' | Game's status: if either swiped "no", it's rejected. If one has swiped "yes", and the other has done nothing, it's "pending". If it's already been played, "completed". And if it's been accepted by both users, but has not yet been played, it's "accepted". |
| winner_id | ObjectId          | None                                                           | Reference to User object that won game.                                                                                                                                                                                                                        |
| spot      | ObjectId          | None                                                           | Reference to Spot object where the game is/was located.                                                                                                                                                                                                        |
| time      | Date              | None                                                           | The agreed time for the match.                                                                                                                                                                                                                                 |
| p1rating  | Embedded Document | None                                                           | Rating written by player2 _about_ player1.                                                                                                                                                                                                                     |
| p2rating  | Embedded Document | None                                                           | Rating written by player1 _about_ player2.                                                                                                                                                                                                                     |
| p1chats   | Embedded Document | None                                                           | Player1's chat messages.                                                                                                                                                                                                                                       |
| p2chats   | Embedded Document | None                                                           | Player2's chat messages.                                                                                                                                                                                                                                       |

---

#### Embedded Documents in Game Model:

##### __Rating__:

| Key           | Type   | Validations | Description                                            | 
| :------------ | :----- | :---------- | :----------------------------------------------------- |
| insideO       | Number | required    | Numeric rating, 0-100, about player's inside offense.  |
| outsideO      | Number | required    | Numeric rating, 0-100, about player's outside offense. |
| defense       | Number | required    | Numeric rating, 0-100, about player's defense.         |
| sportsmanship | Number | required    | Numeric rating, 0-100, about player's sportsmanship.   |
| comment       | String | checkLength | Comment about the game, kept under 180 characters.     |

##### __Chat__:

| Key       | Type    | Validations           | Description                                                     | 
| :-------- | :------ | :-------------------- | :-------------------------------------------------------------- |
| content   | String  | checkLength, required | Message's content, kept under 180 characters.                   |
| read      | Boolean | None                  | Once the opponent sees the message, this will change to `true`. |
| createdAt | Date    | required              | Gives the timestamp for when it was created.                    |

---

### API Routes:

__SPLASH__

| Route  | HTTP | Auth | Query Options | Description      | 
| :----- | :--- | :--- | :------------ | :--------------- |
| `/api` | GET  | None | None          | Welcome message. |

__AUTHENTICATION__

| Route        | HTTP | Auth | Query Options | Description                | 
| :----------- | :--- | :--- | :------------ | :------------------------- |
| `/api/login` | POST | None | None          | Login, receive JWT.        |
| `/api/me`    | GET  | None | None          | Decode token for user info |

__USERS__

| Route                 | HTTP    | Auth    | Query Options | Description                                                 | 
| :-------------------- | :------ | :------ | :------------ | :---------------------------------------------------------- |
| `/api/users`          | GET     | Admin   | None          | Return all users.                                           |
| `/api/users/:user_id` | GET     | General | None          | Get single user info.                                       |
| `/api/users`          | POST    | None    | None          | Create new user. Get token, as well and log in as new user. |
| `/api/users/:user_id` | PUT     | General | None          | Update user's info.                                         |
| `/api/users/:user_id` | DELETE  | General | None          | Delete user's account.                                      |

__SPOTS__

| Route                 | HTTP    | Auth    | Query Options       | Description                                                                                               | 
| :-------------------- | :------ | :------ | :------------------ | :-------------------------------------------------------------------------------------------------------- |
| `/api/spots`          | GET     | Admin   | None                | Return all basketball court locations.                                                                    |
| `/api/spots-within`   | GET     | General | miles(10), lat, lon | Return all basketball court locations within a certain radius (default 10 miles) of a specified location. |
| `/api/spots/:spot_id` | GET     | General | None                | Get a single basketball court.                                                                            |
| `/api/spots`          | POST    | None    | None                | Add a basketball court.                                                                                   |
| `/api/spots/:spot_id` | PUT     | General | None                | Update information about a court.                                                                         |
| `/api/spots/:spot_id` | DELETE  | General | None                | Remove court from db.                                                                                     |

__GAMES__

| Route                       | HTTP    | Auth    | Query Options | Description                   | 
| :-------------------------- | :------ | :------ | :------------ | :---------------------------- |
| `/api/games`                | GET     | Admin   | None          | Get all games.                |
| `/api/users/:user_id/games` | GET     | General | None          | Get all games of a user.      |
| `/api/games/:game_id`       | GET     | General | None          | Get a specific game.          |
| `/api/users/:user_id/games` | POST    | General | None          | Create a new game for a user. |
| `/api/games/:game_id`       | PUT     | General | None          | Update a game.                |
| `/api/games/:game_id`       | DELETE  | General | None          | Delete a game.                |

__RATINGS__

| Route                                                   | HTTP    | Auth    | Query Options | Description                             | 
| :------------------------------------------------------ | :------ | :------ | :------------ | :-------------------------------------- |
| `/api/users/:user_id/ratings`                           | GET     | General | None          | Get all ratings of a user.              |
| `/api/users/:user_id/games/:game_id/ratings/:rating_id` | GET     | General | None          | Get a specific rating.                  |
| `/api/users/:user_id/games/:game_id/ratings`            | POST    | General | None          | Create a new rating about the opponent. |
| `/api/users/:user_id/games/:game_id/ratings/:rating_id` | PUT     | General | None          | Update the opponent's rating.           |
| `/api/users/:user_id/games/:game_id/ratings/:rating_id` | DELETE  | Admin   | None          | Delete a rating.                        |

~~__CHATS__~~ - Not implemented yet.

| Route                                               | HTTP    | Auth    | Query Options | Description                  | 
| :-------------------------------------------------- | :------ | :------ | :------------ | :--------------------------- |
| `/api/users/:user_id/games/:game_id/chats`          | GET     | General | None          | Get all messages of a game   |
| `/api/users/:user_id/games/:game_id/chats`          | POST    | General | None          | Create a new message         |
| `/api/users/:user_id/games/:game_id/chats/:chat_id` | DELETE  | General | None          | Delete a previous message    |


