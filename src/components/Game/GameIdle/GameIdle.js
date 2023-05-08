import React from "react";

import { Container, Row, Button } from "react-bootstrap";

import PlayerCard from "../../lib/utils/PlayerCard";

const GameIdle = ({ gameID, players, currentPlayer, startGameHandler }) => {
  const onStartClick = (e) => {
    e.preventDefault();
    startGameHandler();
  };
  return (
    <Container className="mt-5">
      <div className="mb-5 py-4 d-flex justify-content-center text-uppercase fs-2">
        <strong>Game ID: {gameID}</strong>
      </div>
      <Row
        md={4}
        xs={2}
        lg={4}
        className="my-5 py-5 g-4 justify-content-md-center"
      >
        {players.map((player) => (
          <PlayerCard
            key={player.socketId}
            player={player.id}
            me={player.id === currentPlayer}
          />
        ))}
      </Row>
      {currentPlayer === 1 ? (
        <div className="mt-5 d-flex justify-content-center">
          {players.length > 1 ? (
            <Button variant="info" onClick={(e) => onStartClick(e)}>
              Start Game
            </Button>
          ) : (
            <div className="mt-3 d-flex justify-content-center">
              Waiting for more players to join...
            </div>
          )}
        </div>
      ) : (
        <div className="mt-3 d-flex justify-content-center">
          Waiting for admin to start the game!!!
        </div>
      )}
    </Container>
  );
};

export default GameIdle;
