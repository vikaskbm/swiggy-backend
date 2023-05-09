import Game from "./schema/Game.js";

/*
  A new game is created and player is added to the database
  
  1. Try to retrieve a game from database
      If the game does not exist in database, a new game is created.
  2. Return specific errors in case game capacity is full(i.e players === 4) 
      OR when the game is in play state
  3. Create a new player with socketId for currentGame
  4. Update the players property of the game
*/
export const addPlayerToGame = async (socketId, gameId) => {
  const game = await Game.findOneAndUpdate(
    { gameId: gameId },
    {},
    {
      new: true,
      upsert: true,
    }
  );
  const players = game.players.length;

  if (game.state !== "idle") {
    return { error: "Game is in play state open" };
  }

  if (game.players === 4) {
    return { error: "Game is full" };
  }

  const currentPlayer = { socketId, gameId: gameId, id: players + 1 };

  game.players.push(currentPlayer);
  game.save();

  return { game, currentPlayer };
};

/*
  Retrieve a game corrosponding to a game Id 
*/
export const getGameFromGameId = async (gameId) => {
  const game = await Game.findOne({ gameId: gameId });
  return game;
};

/*
  Initial game state is updated and stored in the database
  Arguements-> gameId, deck, playerCards, topCard

  1. Get current game corrosponding to gameId
  2. Top card played is updated in the moves property of game
    {card, type, player}
    type
      I -> Initial
      P -> Pick
      D -> Discard
    For top card: player is -1
  3. Initial deck of game is updated in game
  4. Initial player cards are updated for every player in game
  5. Game is saved to database
*/
export const setInitialStartGameState = async (
  gameId,
  deck,
  playerCards,
  topCard
) => {
  const game = await Game.findOne({ gameId: gameId });
  const move = { type: "I", card: topCard, player: -1 };
  game.moves.push(move);
  game.deck = deck;
  game.state = "play";

  game.players = game.players.map((player) => {
    return { ...player, cards: playerCards[player.id] };
  });

  game.save();
};

/*
  Updating moves when a card is played
  Arguements -> gameId, cards->[], player

  1. Get current game corrosponding to gameId
  2. Current card played is updated in the moves property of game
    {card, type, player}
    type
      I -> Initial
      P -> Pick
      D -> Discard
  3. Game is saved to database
*/
export const playCardMove = async (gameId, card, player = -1) => {
  const game = await Game.findOne({ gameId: gameId });
  const move = { type: "D", card, player };
  game.moves.push(move);
  game.save();
};

/*
  Updating moves when cards are picked
  Arguements -> gameId, cards->[], player

  1. Get current game corrosponding to gameId
  2. cards is iterated and all the cards are and that picked are pushed to cards property of game
    {card, type, player}
    type
      I -> Initial
      P -> Pick
      D -> Discard
  3. Game is saved to database
*/
export const pickCardMove = async (gameId, cards = [], player) => {
  const game = await Game.findOne({ gameId: gameId });
  cards.forEach((card) => {
    const move = { type: "P", card, player };
    game.moves.push(move);
  });
  game.save();
};

/*
  Updating state of a game when it ends.
  Arguements -> gameId,  state, winner
    when state is draw winner remains null
    when state is win winner is currentPlayer

  1. Get current game corrosponding to gameId
  2. Update state
  3. save it to database
*/
export const updateGameEndState = async (gameId, state, winner = null) => {
  const game = await Game.findOne({ gameId: gameId });
  game.state = state;
  if (winner) game.winner = winner;
  game.save();
};
