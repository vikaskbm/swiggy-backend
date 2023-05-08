import express from "express";
import cors from "cors";
import { Server } from "socket.io";

import { isGameValid } from "./lib/utils.js";
import { joinGame, startGame, playCard, pickOneCard } from "./routes.js";
import { initializeDatabase } from "./database.js";

const app = express();
app.use(cors({ origin: "*" }));
const server = app.listen(5000);
const io = new Server(server);

// Initialize database
initializeDatabase((err) => {
  if (err) {
    console.log(err);
  }
});

io.on("connection", (socket) => {
  /*
    Fired when a 'join' event is emitted 
    1. If 'gameId' is provided in payload.
      a. If 'gameId' is valid then current player is added the game corrosponding to that 'gameId'
      b. If 'gameId' is invalid then 'Invalid game Id' error is returned.

    2. If 'gameId' is empty
      a. A new game is created and assigned a gameId.
      b. Current player is added to the game corrosponding to 'gameId'
    
    3. 'gameState' is emitted for all the users in the room.
            gameState : {
              owner: <First Player>,
              players: <Active Players in room>
              state: <Idle>
            }

    4. 'currentUser' is emitted and updated for current socket.
  */
  socket.on("join", async (payload, callback) => {
    const { isGameInvalid, gameId } = await isGameValid(payload.gameID);

    if (isGameInvalid) {
      return callback(isGameInvalid, "Game is invalid");
    }

    const { error, gameState, players, currentPlayer } = await joinGame(
      gameId,
      socket
    );

    if (error) {
      return callback(error);
    }

    socket.join(gameId);

    io.to(gameId).emit("gameState", {
      gameState,
      players,
    });

    socket.emit("currentUser", {
      playerUID: currentPlayer.socketId,
      currentPlayer: currentPlayer.id,
      gameId,
    });

    callback();
  });

  /*
    Fired when a game is started

    Cards are distributed to players and state of game is changed to start.

    Current 'gameState' is emitted to all the players in game
    List of 'players' in room is emitted to all the players in game
  */
  socket.on("startGame", async (payload) => {
    const gameId = payload.gameID;
    const players = payload.players;
    const gameState = await startGame(gameId, players);

    io.to(gameId).emit("gameState", {
      gameState,
      players,
    });
  });

  /*
    Fired when a card is played

    'playCard' method is called to get new gameState and emitted to all the players in game
  */
  socket.on("playCard", (payload) => {
    const prevState = payload.gameState;
    const card = payload.card;
    const gameId = payload.gameID;

    const gameState = playCard(gameId, prevState, card);

    io.to(gameId).emit("updateGameState", {
      gameState,
    });
  });

  /*
    Fired when a card is played

    'pickCard' method is called to get new gameState and emitted to all the players in game
  */
  socket.on("pickCard", async (payload) => {
    const prevState = payload.gameState;
    const gameId = payload.gameID;

    const gameState = await pickOneCard(gameId, prevState);
    io.to(gameId).emit("updateGameState", {
      gameState,
    });
  });
});
