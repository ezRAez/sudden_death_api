# [jamn_api](http://fast-chamber-70325.herokuapp.com/api)

##### Node/Express server for the phone app, __JAMN!__ @ http://fast-chamber-70325.herokuapp.com/api

---

### Models:

##### __User__: 

| Key           | Type    | Validations | Description      | 
| :------------ | :------ | :---------- | :--------------- |
| name          | String  | None        | Welcome message. |
| userName      | String  | None        | Welcome message. |
| password      | String  | None        | Welcome message. |
| email         | String  | None        | Welcome message. |
| zip           | String  | None        | Welcome message. |
| sex           | String  | None        | Welcome message. |
| opponentPref  | String  | None        | Welcome message. |
| height        | Number  | None        | Welcome message. |
| picture       | String  | None        | Welcome message. |
| represent     | String  | None        | Welcome message. |
| respect       | Number  | None        | Welcome message. |
| wins          | Number  | None        | Welcome message. |
| losses        | Number  | None        | Welcome message. |
| forfeits      | Number  | None        | Welcome message. |
| outsideO      | Number  | None        | Welcome message. |
| insideO       | Number  | None        | Welcome message. |
| defense       | Number  | None        | Welcome message. |
| sportsmanship | Number  | None        | Welcome message. |


##### __Spot__: 

| Key           | Type               | Validations | Description      | 
| :------------ | :----------------- | :---------- | :--------------- |
| name          | String             | None        | Welcome message. |
| latlng        | 2D Array - Numbers | None        | Welcome message. |
| address       | String             | None        | Welcome message. |
| indoor        | Boolean            | None        | Welcome message. |


##### __Game__: 

| Key       | Type              | Validations | Description      | 
| :-------- | :---------------- | :---------- | :--------------- |
| player1   | ObjectId          | None        | Welcome message. |
| player2   | ObjectId          | None        | Welcome message. |
| status    | String            | None        | Welcome message. |
| winner_id | ObjectId          | None        | Welcome message. |
| spot      | ObjectId          | None        | Welcome message. |
| time      | Date              | None        | Welcome message. |
| p1rating  | Embedded Document | None        | Welcome message. |
| p2rating  | Embedded Document | None        | Welcome message. |
| p1chats   | Embedded Document | None        | Welcome message. |
| p2chats   | Embedded Document | None        | Welcome message. |

---

#### Embedded Documents in Game Model:

##### __Rating__:

| Key           | Type   | Validations | Description      | 
| :------------ | :----- | :---------- | :--------------- |
| insideO       | Number | None        | Welcome message. |
| outsideO      | Number | None        | Welcome message. |
| defense       | Number | None        | Welcome message. |
| sportsmanship | Number | None        | Welcome message. |
| comment       | String | None        | Welcome message. |

##### __Chat__:

| Key     | Type    | Validations | Description      | 
| :------ | :------ | :---------- | :--------------- |
| content | String  | None        | Welcome message. |
| read    | Boolean | None        | Welcome message. |
| sent    | Date    | None        | Welcome message. |

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
| `/api/spots-within`   | GET     | Admin   | miles(10), lat, lon | Return all basketball court locations within a certain radius (default 10 miles) of a specified location. |
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
| `/api/users/:user_id/games/:game_id/ratings`            | GET     | General | None          | Get all ratings of a game.              |
| `/api/users/:user_id/games/:game_id/ratings/:rating_id` | GET     | General | None          | Get a specific rating.                  |
| `/api/users/:user_id/games/:game_id/ratings`            | POST    | General | None          | Create a new rating about the opponent. |
| `/api/users/:user_id/games/:game_id/ratings/:rating_id` | PUT     | General | None          | Update the opponent's rating.           |
| `/api/users/:user_id/games/:game_id/ratings/:rating_id` | DELETE  | Admin   | None          | Delete a rating.                        |

__CHATS__

| Route                                               | HTTP    | Auth    | Query Options | Description                  | 
| :-------------------------------------------------- | :------ | :------ | :------------ | :--------------------------- |
| `/api/users/:user_id/games/:game_id/chats`          | GET     | General | None          | Get all messages of a game   |
| `/api/users/:user_id/games/:game_id/chats`          | POST    | General | None          | Create a new message         |
| `/api/users/:user_id/games/:game_id/chats/:chat_id` | DELETE  | General | None          | Delete a previous message    |


