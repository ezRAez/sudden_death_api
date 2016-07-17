# [jamn_api](http://fast-chamber-70325.herokuapp.com/api)

##### Node/Express server for the phone app, __JAMN!__ @ http://fast-chamber-70325.herokuapp.com/api

---
#### API Routes:

__SPLASH__

| Route  | HTTP | Auth | Description      | 
| :----- | :--- | :--- | :--------------- |
| `/api` | GET  | None | Welcome message. |

__AUTHENTICATION__

| Route        | HTTP | Auth | Description                | 
| :----------- | :--- | :--- | :------------------------- |
| `/api/login` | POST | None | Login, receive JWT.        |
| `/api/me`    | GET  | None | Decode token for user info |

__USERS__

| Route                 | HTTP    | Auth    | Description            | 
| :-------------------- | :------ | :------ | :--------------------- |
| `/api/users`          | GET     | Admin   | Return all users.      |
| `/api/users/:user_id` | GET     | General | Get single user info.  |
| `/api/users`          | POST    | None    | Create new user.       |
| `/api/users/:user_id` | PUT     | General | Update user's info.    |
| `/api/users/:user_id` | DELETE  | General | Delete user's account. |

__SPOTS__

| Route                 | HTTP    | Auth    | Description                            | 
| :-------------------- | :------ | :------ | :------------------------------------- |
| `/api/spots`          | GET     | Admin   | Return all basketball court locations. |
| `/api/spots/:spot_id` | GET     | General | Get a single basketball court.         |
| `/api/spots`          | POST    | None    | Add a basketball court.                |
| `/api/spots/:spot_id` | PUT     | General | Update information about a court.      |
| `/api/spots/:spot_id` | DELETE  | General | Remove court from db.                  |

__GAMES__

| Route                       | HTTP    | Auth    | Description                   | 
| :-------------------------- | :------ | :------ | :---------------------------- |
| `/api/games`                | GET     | Admin   | Get all games.                |
| `/api/users/:user_id/games` | GET     | General | Get all games of a user.      |
| `/api/games/:game_id`       | GET     | General | Get a specific game.          |
| `/api/users/:user_id/games` | POST    | General | Create a new game for a user. |
| `/api/games/:game_id`       | PUT     | General | Update a game.                |
| `/api/games/:game_id`       | DELETE  | General | Delete a game.                |

__RATINGS__

| Route                                                   | HTTP    | Auth    | Description                             | 
| :------------------------------------------------------ | :------ | :------ | :-------------------------------------- |
| `/api/users/:user_id/games/:game_id/ratings`            | GET     | General | Get all ratings of a game.              |
| `/api/users/:user_id/games/:game_id/ratings/:rating_id` | GET     | General | Get a specific rating.                  |
| `/api/users/:user_id/games/:game_id/ratings`            | POST    | General | Create a new rating about the opponent. |
| `/api/users/:user_id/games/:game_id/ratings/:rating_id` | PUT     | General | Update the opponent's rating.           |
| `/api/users/:user_id/games/:game_id/ratings/:rating_id` | DELETE  | Admin   | Delete a rating.                        |

__CHATS__

| Route                                               | HTTP    | Auth    | Description                  | 
| :-------------------------------------------------- | :------ | :------ | :--------------------------- |
| `/api/users/:user_id/games/:game_id/chats`          | GET     | General | Get all messages of a game   |
| `/api/users/:user_id/games/:game_id/chats`          | POST    | General | Create a new message         |
| `/api/users/:user_id/games/:game_id/chats/:chat_id` | DELETE  | General | Delete a previous message    |


