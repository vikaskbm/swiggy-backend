import React from "react";
import { Container } from "react-bootstrap";

const GameEnd = ({ state, currentPlayer, winner = -1 }) => {
  // if game draws
  // if game ends
  // 1. Player {player} wins
  // 2. You win
  return (
    <Container className="m-auto vh-100 p-auto">
      <div className="py-5 text-center">
        <h1 className=" fw-bold">Game Over</h1>
        <br />
        {state === "draw" ? (
          <strong>{`No winner this time :(`}</strong>
        ) : (
          <p>
            <strong className="col-md-8 fs-6 m-auto text-start">
              {winner === currentPlayer
                ? "You win"
                : `Player ${winner} wins!!!`}
            </strong>
          </p>
        )}
      </div>
    </Container>
    // <Container className="vh-100 m-auto">
    //   <h4>Game Over</h4>
    // {state === "draw" ? (
    //   <>
    //     <p>{`No winner this time :(`}</p>
    //   </>
    // ) : (
    //   <>
    //     <p>
    //       {winner === currentPlayer ? "You win" : `Player ${winner} wins!!!`}
    //     </p>
    //   </>
    // )}
    // </Container>
  );
};

export default GameEnd;
