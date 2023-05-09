import React, { useEffect, useState } from "react";
import io from "socket.io-client";

import { useLocation, useNavigate } from "react-router-dom";

import GameIdle from "./GameIdle/GameIdle";
import GameEnd from "./GameEnd/GameEnd";
import Loading from "../lib/utils/Loading";
import GamePlay from "./GamePlay/GamePlay";

const ENDPOINT = process.env.REACT_APP_ENDPOINT;
let socket;

const Game = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [gameID, setGameID] = useState(location.state?.gameID);

  useEffect(() => {
    socket = io.connect(ENDPOINT, {
      forceNew: true,
      reconnectionAttempts: "Infinity",
      timeout: 10000,
      transports: ["websocket"],
    });

    socket.emit("join", { gameID }, (error, errMessage) => {
      if (error) {
        setLoading(false);
        return navigate("/", { state: { errMessage } });
      }
    });

    return function cleanup() {
      socket.disconnect();
      socket.off();
    };
  }, []);

  // Game logic
  const [players, setPlayers] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(-1);
  const [gameState, setGameState] = useState({});

  useEffect(() => {
    //send initial state to server
    const playerUID = localStorage.getItem("playerUID");
    socket.emit("initGameState", {
      playerUID,
      gameID,
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    socket.on("gameState", ({ gameState, players }) => {
      setGameState(gameState);
      setPlayers(players);
      setLoading(false);
    });

    socket.on("currentUser", ({ playerUID, currentPlayer, gameId }) => {
      setCurrentPlayer(currentPlayer);
      setGameID(gameId);
      setLoading(false);
    });

    socket.on("updateGameState", ({ gameState }) => {
      setGameState(gameState);
      setLoading(false);
    });
  }, []);

  const onStartGameClick = () => {
    setLoading(true);
    socket.emit("startGame", { gameID, players });
  };

  const playCard = (card) => {
    socket.emit("playCard", { gameID, gameState, card });
  };

  const pickCard = () => {
    socket.emit("pickCard", { gameID, gameState });
  };

  if (loading) {
    return <Loading />;
  }
  console.log(gameState);
  return (
    <>
      {gameState.state === "idle" ? (
        <GameIdle
          gameID={gameID}
          players={players}
          startGameHandler={onStartGameClick}
          currentPlayer={currentPlayer}
        />
      ) : gameState.state === "play" ? (
        <GamePlay
          gameID={gameID}
          gameState={gameState}
          currentPlayer={currentPlayer}
          turn={gameState.turn}
          players={players}
          playCard={playCard}
          pickCard={pickCard}
        />
      ) : (
        <GameEnd
          state={gameState.state}
          currentPlayer={currentPlayer}
          winner={gameState.winner}
        />
      )}
    </>
  );
};

export default Game;
