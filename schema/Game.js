import mongoose from "mongoose";
const { Schema, model } = mongoose;

const moveSchema = new Schema({
  player: String,
  card: String,
});

const playerSchema = new Schema({
  gameId: String,
  socketId: String,
  player: Number,
});

const gameSchema = new Schema({
  gameId: String,
  owner: { type: Number, default: 1 },
  players: [{ socketId: String, gameId: String, id: Number, cards: [] }],
  moves: [{ type: { type: String }, player: String, card: String }],
  state: { type: String, default: "idle" },
});

const Game = model("Game", gameSchema);

export default Game;
