import mongoose from "mongoose";
const { Schema, model } = mongoose;

// Commented out because a lot of changes were being made. Will be integrated once schema for moves is final
// const moveSchema = new Schema({
//   type: { type: String },
//   player: String,
//   card: String,
// });

// Commented out because a lot of changes were being made. Will be integrated once schema for player is final
// const playerSchema = new Schema({
//   gameId: String,
//   socketId: String,
//   id: Number,
//   cards: Array,
// });

const gameSchema = new Schema({
  gameId: String,
  owner: { type: Number, default: 1 },
  players: [{ socketId: String, gameId: String, id: Number, cards: Array }],
  moves: [{ type: { type: String }, player: String, card: String }],
  state: { type: String, default: "idle" },
});

const Game = model("Game", gameSchema);

export default Game;
