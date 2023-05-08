import { getCards, getNextTurn } from "./lib/utils.js";
import {
  addPlayerToGame,
  pickCardMove,
  playCardMove,
  setInitialStartGameState,
  updateGameEndState,
} from "./controller.js";
/*
  1. Getting all the players in the game
  2. Adding current player to current game
      Return any errors if they are encountered
  3. Return 'gameState', 'players' and 'currentPlayer' in the game
*/
export const joinGame = async (gameId, socket) => {
  const { error, game, currentPlayer } = await addPlayerToGame(
    socket.id,
    gameId
  );

  if (error) {
    return { error };
  }

  return {
    gameState: game,
    players: game.players,
    currentPlayer,
  };
};

export const startGame = async (gameId, players) => {
  const { deck, playerCards, topCard } = getCards(players);
  await setInitialStartGameState(gameId, deck, playerCards, topCard);
  const gameState = {
    gameId: gameId,
    players: players.length,
    deck,
    playerCards,
    topCard,
    turn: 1,
    state: "play",
    direction: 1,
  };

  return gameState;
};

const playKingCard = (
  prevState,
  playersInGame,
  currentPlayer,
  card,
  playerWon
) => {
  const newDirection = -prevState.direction;
  const gameState = {
    ...prevState,
    turn: getNextTurn(currentPlayer, playersInGame, newDirection),
    topCard: card,
    direction: newDirection,
    state: playerWon ? "win" : prevState.state,
    winner: playerWon ? currentPlayer : null,
  };
  return gameState;
};

const playPickNCards = (
  prevState,
  playersInGame,
  currentPlayer,
  card,
  playerWon
) => {
  const gameId = prevState.gameId;
  const numberOfCardsToBePicked = card[2] === "Q" ? 2 : 4;
  const nextPlayer = getNextTurn(
    currentPlayer,
    playersInGame,
    prevState.direction
  );

  let state = null;
  if (numberOfCardsToBePicked < prevState.deck.length) {
    const pickedCards = prevState.deck.splice(0, numberOfCardsToBePicked);
    pickCardMove(gameId, pickedCards, nextPlayer);
    prevState.playerCards[nextPlayer] = [
      ...prevState.playerCards[nextPlayer],
      ...pickedCards,
    ];
  } else {
    state = "draw";
    if (!playerWon) {
      updateGameEndState(gameId, state);
    }
  }

  const gameState = {
    ...prevState,
    turn: getNextTurn(currentPlayer, playersInGame, prevState.direction, 2),
    topCard: card,
    state: playerWon ? "win" : state === "draw" ? "draw" : prevState.state,
    winner: playerWon ? currentPlayer : null,
  };

  return gameState;
};

const playSkipCard = (
  prevState,
  playersInGame,
  currentPlayer,
  card,
  playerWon
) => {
  const gameState = {
    ...prevState,
    turn: getNextTurn(currentPlayer, playersInGame, prevState.direction, 2),
    topCard: card,
    state: playerWon ? "win" : prevState.state,
    winner: playerWon ? currentPlayer : null,
  };
  return gameState;
};

const playNumberCard = (
  prevState,
  playersInGame,
  currentPlayer,
  card,
  playerWon
) => {
  const gameState = {
    ...prevState,
    turn: getNextTurn(currentPlayer, playersInGame, prevState.direction),
    topCard: card,
    state: playerWon ? "win" : prevState.state,
    winner: playerWon ? currentPlayer : null,
  };
  return gameState;
};

const checkPlayerWon = (cards) => {
  return cards.length === 0;
};

export const playCard = (gameId, prevState, card) => {
  const playersInGame = prevState.players;
  const currentPlayer = prevState.turn;

  const newCards = prevState.playerCards[currentPlayer].filter(
    (c) => c !== card
  );

  playCardMove(gameId, card, currentPlayer);
  const playerWon = checkPlayerWon(newCards);
  if (playerWon) {
    console.log(playerWon);
    updateGameEndState(gameId, "win", currentPlayer);
  }
  prevState.playerCards[currentPlayer] = newCards;
  if (card[2] === "K") {
    return playKingCard(
      prevState,
      playersInGame,
      currentPlayer,
      card,
      playerWon
    );
  } else if (card[2] === "Q" || card[2] === "J") {
    return playPickNCards(
      prevState,
      playersInGame,
      currentPlayer,
      card,
      playerWon
    );
  } else if (card[2] === "A") {
    return playSkipCard(
      prevState,
      playersInGame,
      currentPlayer,
      card,
      playerWon
    );
  } else {
    return playNumberCard(
      prevState,
      playersInGame,
      currentPlayer,
      card,
      playerWon
    );
  }
};

export const pickOneCard = (gameId, prevState) => {
  const playersInGame = prevState.players;
  const currentPlayer = prevState.turn;

  if (prevState.deck.length === 0) {
    updateGameEndState(gameId, "draw");
    const gameState = {
      ...prevState,
      turn: getNextTurn(currentPlayer, playersInGame, prevState.direction),
      state: "draw",
    };
    return gameState;
  } else {
    const card = prevState.deck.splice(0, 1);
    pickCardMove(gameId, card, currentPlayer);
    prevState.playerCards[currentPlayer] = [
      ...prevState.playerCards[currentPlayer],
      ...card,
    ];
    const gameState = {
      ...prevState,
      turn: getNextTurn(currentPlayer, playersInGame, prevState.direction),
    };
    return gameState;
  }
};
