import { SUITES, RANK, CARD_MAPPING } from "./constants.js";
import { getGameFromGameId } from "../controller.js";

let games = {};

/*
  Checking validity of a game with given gameId
*/
export const isGameValid = async (id) => {
  if (!id) {
    let gameId = getGameUID();
    return { gameId };
  }

  let game = await getGameFromGameId(id);
  const isGameInvalid = game === null;
  return { isGameInvalid, gameId: id };
};

/*
  Retrieve a game corrosponding to a gameId
  If a game does not exist an empty 
*/

export const getCurrentGame = (gameId) => {
  if (!Object.hasOwn(games, gameId)) {
    return {};
  }
  return games[gameId];
};

/*
  1. If a game does not exist then create a game corrosponding to 'gameId'
  2. exists return the 'players' property of 'games[gameId]' object
  3. If game is not in 'idle' state OR number of players in game is '4' then return error
  4. Create a player object and add it in the players list of game
  return current player
*/

// Creates and returns a shuffled deck of cards
export const getShuffledCards = () => {
  let arr = [];

  SUITES.forEach((suite) => {
    RANK.forEach((rnk) => {
      arr.push(suite + "-" + rnk);
    });
  });

  const deck = arr.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const ridx = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[ridx]] = [deck[ridx], deck[i]];
  }
  return deck;
};

// Distribute cards in deck of our game to players in our game
export const distributeCards = (deck, players) => {
  let cards = {};
  players.forEach((player) => {
    cards[player.id] = deck.splice(0, 5);
  });
  return cards;
};

/*
  Returns top card in the discard pile swhen a game is started

  We keep removing a card from front till it is not an Ace, King, Queen or Jack
*/
export const getTopCard = (deck) => {
  while (
    deck[0][2] == "A" ||
    deck[0][2] == "K" ||
    deck[0][2] == "Q" ||
    deck[0][2] == "J"
  ) {
    deck.push(deck.shift());
  }
  return deck.shift();
};

/* 
  Sort cards based on the suite and rank. 
  CARD_MAPPING maps all the ranks and suited to a weight that is used for custom sorting
*/
export const sortPlayerCards = () => {
  list.sort(function (x, y) {
    let sx = x[0];
    let sy = y[0];

    let rx = x.length === 4 ? "10" : x[2];
    let ry = y.length === 4 ? "10" : y[2];

    if (CARD_MAPPING[sx] == CARD_MAPPING[sy])
      return CARD_MAPPING[ry] - CARD_MAPPING[rx];
    return CARD_MAPPING[sx] - CARD_MAPPING[sy];
  });
};

/*
  Invoked when a game is started.

  1. A deck of shuffled card is retrieved.
  2. All the players in game are retrieved
  3. 'deck' cards are distributed to 'players' in the game
  4. We get a valid 'top' card which will be the first card on the discard pile
*/
export const getCards = (players) => {
  const deck = getShuffledCards();
  const playerCards = distributeCards(deck, players);
  const topCard = getTopCard(deck);
  return { deck, playerCards, topCard };
};

// Getting next player in both clockwise and anticlockwise direction
export const getNextTurn = (
  currentPlayer,
  playersInGame,
  direction,
  step = 1
) => {
  if ((currentPlayer + step * direction) % playersInGame === 0)
    return playersInGame;

  if (direction === 1) {
    return (currentPlayer + step * direction) % playersInGame;
  } else {
    return (playersInGame + currentPlayer + step * direction) % playersInGame;
  }
};

// Get a unique gameId for a new game
export const getGameUID = () => {
  return "" + Math.floor(10000000 + Math.random() * 90000000);
};
