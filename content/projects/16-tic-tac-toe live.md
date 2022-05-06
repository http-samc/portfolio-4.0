---
title: Tic Tac Toe Live
description: A 2-Player web app for competitive Tic Tac Toe ❌ ⭕️
important: false
cover: /assets/img/ttt-live-demo.png
tags:
    - Website
    - Game
    - JavaScript
---

> Tic Tac Toe is chess for smart people <cite>&mdash; Isaac Newton (probably)</cite>

## What is it?
After getting bored at lunch, my friends and I discovered the world of competitive Tic-Tac-Toe. We wanted a simple place to play that wouldn't get blocked on our school's WiFi, so I developed the app to host on this site.

## How do I play?
Go to [legacy.smrth.dev/ttt](https://legacy.smrth.dev/ttt) to create a new game. A unique game id will be added to your url. Take this unique game link and share it to another friend. This "friend" needs to be on a different device than you. If this isn't possible, open a tab on the same browser in Incognito mode. This is because the unique player tokens are stored in the browser's local storage.

## How does it work?

### Endpoints & API Documentation
This app doesn't use websockets for realtime processing. Instead, there are 3 endpoints.

1. [/api/tic-tac-toe/create](/api/tic-tac-toe/create)
- This endpoint lets you use a `GET` request to recieve the following data:

```json
{
    "message": "<str>",
    "id": "<str, game id>"
}
```

2. [/api/tic-tac-toe/play](/api/tic-tac-toe/play)
- This endpoint lets you use a `POST` request (with the following schema) to make a move:

```json
{
    "token": "<str, unique player token>",
    "id": "<str, game id>",
    "spotClaimed": "<arr::int, len = 2, no idx with a val > 2 (if playing 3 x 3), eg. [1, 1]>
}
```

3. [/api/tic-tac-toe/view/:id/:token](/api/tic-tac-toe/view/:id/:token)
- This endpoint lets you use a `GET` request to recieve the following data:

```json
{
    "message": "<str>",
    "board": "<arr::arr::int, 2D array representing the current 3 x 3 board>"
}
```

4. [/api/tic-tac-toe/reset/:id/:token](/api/tic-tac-toe/reset/:id/:token)
- This endpoint lets you use a `GET` request to clear the board. It is useful for users who want to play multiple games but don't want to make new games (new "links" and ids) every time. It returns the following data:

```json
{
    "message": "<str>",
}
```

5. [/api/tic-tac-toe/auth/:id](/api/tic-tac-toe/auth/:id)
- This endpoint lets you use a `GET` request to recieve a token, provided with a valid game id. If the game already has two players, you will get an error. The first player to request a token is the `X` player, and the second one is the `O` player. This token is required to view the game board, reset the game, and to make a move. Since it is unique to each player, it allows the server to differentiate between them so it knows what to markk.

```json
{
    "message": "<str>",
    "token": "<token>"
}
```

### Server Side Storage
Games are stored in a `json` file on the server running this site (unfortunately my server would crash quickly if I used something like [mongo db](https://www.mongodb.com/); fortunately this application is light enough that it realistically does not make a difference). The schema is as follows:
```json
{
    ...,
    "<str, 12 digit game id>": {
        "xPlayer": "<str, 8 digit player token>",
        "oPlayer": "<str, 8 digit player token>",
        "xTurn": <bool, whether or not its X's turn>,
        // Spots claimed by X are marked "X"
        // Spots claimed by Y are marked "Y"
        // Unclaimed spots are null
        "board": [
            [
                null,
                null,
                null
            ],
            [
                null,
                null,
                null
            ],
            [
                null,
                null,
                null
            ]
        ],
        "lastMove": "<str, UTC Timestamp of the last move (by either player)>"
    },
    ...
}
```

### General Notes
Once a game is created, a token is requested. The user creating the game has their token stored in local browser storage so it can be sent with subsequent requests. This user can then, using their custom game link, share it to one other player (since Tic Tac Toe is 1 on 1). Upon opening this link, the player is assigned a token in a similar manner. From this point on, the game is now "private", as only the parties with the game id **and** the correct token can view the board. Tokens are stored in local storage in the format `{ id, token }`, with the "side" of the player being stored as `{ id:whoami, side }`, where `id` is the game id and `side` is either `X` or `O`. This allows users have multiple games queued up (which they can play at any time via accessing the link and coordinating with the other player) without requiring active server-side connection in the meanwhile or a login system.

The token system wasn't my first choice. Initially, I went with an IP-based system. However, I quickly found out when playing with friends at lunch that, because we were all on one school WiFi network, IP tracking wouldn't work. Though this involved more work, it made the project useful (for my circumstances) and was therefore a necessary step.

`lastModified` timestamps are stored to help prevent games from taking up dead space by removing inactive ones over time (*as of 11/12/21 they are collected but not yet implemented as research is still being done to determine the best intervals for deletion*).

## Frontend
The game board is a simple 3 x 3 grid of `<input>` elements. They have a custom `goldenrod` border on focus and are `null` until filled by a player, at which point the player's marker is inserted using `firebrick` (which clashes nicely with the `cornflowerblue` background) colored text. The team markers also use the `Permanent Marker` font in order to introduce a more playful field. The status bar on top lets the user know whose turn it is, and notifications (provided via [notify.js](https://notifyjs.jpillora.com/)) are used to provide further information.

![ Tic Tac Toe Live](https://smrth.dev/assets/img/ttt-live-demo.png)

This was my first time using `window.localStorage`, and I'm glad I did because it enabled a seamless experience when returning to games without having to deal with a login system. This was also my first time using `setInterval`, which was ridiculously simple to set up - I only needed to define my function and what interval to run it at (I run a 2500ms interval).

Even though the rest of this site uses [Bootstrap.css](https://getbootstrap.com/docs/3.4/css/), I wanted to hone in on my low-level skills. So, the game page itself is all just simple CSS and JavaScript. That being said, I did use [jQuery](https://jquery.com/) to simply finding elements and making requests to the API.