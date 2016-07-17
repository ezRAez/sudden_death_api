# [jamn_api](http://fast-chamber-70325.herokuapp.com/api)

##### Node/Express server for the phone app, __JAMN!__ @ http://fast-chamber-70325.herokuapp.com/api

---
#### API Routes:

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


