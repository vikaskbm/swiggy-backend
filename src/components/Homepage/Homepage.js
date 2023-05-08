import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { Alert, Button, Container } from "react-bootstrap";
const Homepage = () => {
  const [gameID, setGameID] = useState("");

  const location = useLocation();
  let errorMessage = location.state?.errMessage;

  return (
    <Container>
      {errorMessage && (
        <Alert variant="danger" dismissible>
          {errorMessage}
        </Alert>
      )}
      <div className="py-5 text-center">
        <h1 className=" fw-bold">Rules</h1>
        <ul className="col-md-8 fs-6 m-auto mt-4 mb-2 list-inline">
          <li className="text-start">
            Each player starts with a hand of 5 cards.
          </li>
          <li className="text-start">
            The game starts with a deck of 52 cards (a standard deck of playing
            cards).
          </li>
          <li className="text-start">
            Players take turns playing cards from their hand, following a set of
            rules that define what cards can be played when.
          </li>
          <li className="text-start">
            A player can only play a card if it matches either the suit or the
            rank of the top card on the discard pile.
          </li>
          <li className="text-start">
            If a player cannot play a card, they must draw a card from the draw
            pile. If the draw pile is empty, the game ends in a draw and no
            player is declared a winner.
          </li>
          <li className="text-start">
            The game ends when one player runs out of cardswho is declared the
            winner.
          </li>
        </ul>
        <br />
        <strong className="col-md-8 fs-6 m-auto text-start">
          BONUS: Aces, Kings, Queens and Jack are action cards. When one of
          these is played the following actions occur:
        </strong>
        <ul className="col-md-8 fs-6 m-auto mt-3 mb-2 list-inline">
          <li className="text-start">Ace(A): Skip the next player in turn</li>
          <li className="text-start">
            Kings(K): Reverse the sequence of who plays next{" "}
          </li>
          <li className="text-start">
            Queens(Q): +2. Draw 2 cards from discard pile
          </li>
          <li className="text-start">
            Jacks(J): +4. Draw 4 cards from discard pile
          </li>
        </ul>
        <div className="d-flex flex-row m-auto col-md-8 mt-5">
          <div className="w-100 p-3">
            <input
              type="text"
              className="mx-2"
              value={gameID}
              onChange={(e) => setGameID(e.target.value)}
            />
            <Link to={gameID ? "/play" : null} state={{ gameID: gameID }}>
              <Button disabled={!gameID}>Join game</Button>
            </Link>
          </div>
          <div className="w-100 p-3">
            <Link to="/play">
              <Button>Create game</Button>
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Homepage;
