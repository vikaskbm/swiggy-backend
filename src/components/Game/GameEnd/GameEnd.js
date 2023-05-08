import React from "react";
import { Container } from "react-bootstrap";

const GameEnd = ({ state, currentPlayer, winner = -1 }) => {
  // if game draws
  // if game ends
  // 1. Player {player} wins
  // 2. You win
  return (
    <Container className="vh-100 m-auto">
      <h4>Game Over</h4>
      {state === "draw" ? (
        <>
          <p>{`No winner this time :(`}</p>
        </>
      ) : (
        <>
          <p>
            {winner === currentPlayer ? "You win" : `Player ${winner} wins!!!`}
          </p>
        </>
      )}
    </Container>
  );
};

export default GameEnd;
