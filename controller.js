import Game from "./schema/Game.js";

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

export const getGameFromGameId = async (gameId) => {
  const game = await Game.findOne({ gameId: gameId });
  return game;
};

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

export const playCardMove = async (gameId, card, player = -1) => {
  const game = await Game.findOne({ gameId: gameId });
  const move = { type: "D", card, player };
  game.moves.push(move);
  game.save();
};

export const pickCardMove = async (gameId, cards = [], player = -1) => {
  const game = await Game.findOne({ gameId: gameId });
  cards.forEach((card) => {
    const move = { type: "P", card, player };
    game.moves.push(move);
  });
  game.save();
};

export const updateGameEndState = async (gameId, state, winner = null) => {
  const game = await Game.findOne({ gameId: gameId });
  game.state = state;
  if (winner) game.winner = winner;
  game.save();
};
