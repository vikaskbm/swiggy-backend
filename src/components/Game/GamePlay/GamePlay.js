import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import FaceDownCard from "../../lib/utils/FaceDownCard";
import FaceUpCard from "../../lib/utils/FaceUpCard";

const GamePlay = ({
  gameID,
  gameState,
  players,
  currentPlayer,
  turn,
  playCard,
  pickCard,
}) => {
  const [player2, setPlayer2] = useState(null);
  const [player3, setPlayer3] = useState(null);
  const [player4, setPlayer4] = useState(null);
  const playerSet = new Set();
  useEffect(() => {
    playerSet.add(currentPlayer);
    const p2 =
      (currentPlayer + 1) % players.length === 0
        ? players.length
        : (currentPlayer + 1) % players.length;
    const p3 =
      (currentPlayer + 2) % players.length === 0
        ? players.length
        : (currentPlayer + 2) % players.length;
    const p4 =
      (currentPlayer + 3) % players.length === 0
        ? players.length
        : (currentPlayer + 3) % players.length;

    if (!playerSet.has(p2)) {
      setPlayer2(p2);
      playerSet.add(p2);
    }
    if (!playerSet.has(p3)) {
      setPlayer3(p3);
      playerSet.add(p3);
    }
    if (!playerSet.has(p4)) {
      setPlayer4(p4);
      playerSet.add(p4);
    }
  }, []);

  return (
    <Container className="vh-100">
      <Row style={{ height: "35%" }}>
        <Col className="m-auto">
          {player2 !== null && (
            <>
              <div className="d-flex justify-content-center">
                {gameState.playerCards[player2] &&
                  gameState.playerCards[player2].map((card) => {
                    return <FaceDownCard key={card} />;
                  })}
              </div>
              <span className="d-flex justify-content-center pt-2">
                Player {player2}
              </span>
            </>
          )}
        </Col>
        <Col className="m-auto">
          {player3 !== null && (
            <>
              <div className="d-flex justify-content-center">
                {gameState.playerCards[player3] &&
                  gameState.playerCards[player3].map((card) => {
                    return <FaceDownCard key={card} />;
                  })}
              </div>
              <span className="d-flex justify-content-center pt-2">
                Player {player3}
              </span>
            </>
          )}
        </Col>
      </Row>
      <Row style={{ height: "30%" }}>
        <Col className="m-auto d-flex ">
          <div className="mt-3 text-uppercase fs-6 text-primary">
            <strong>Game ID: {gameID}</strong>
          </div>
        </Col>
        <Col className="m-auto d-flex justify-content-center">
          <FaceUpCard card={gameState.topCard} />
        </Col>
        <Col className="m-auto d-flex justify-content-center">
          <FaceDownCard
            deck={gameState.deck}
            topCard={gameState.topCard}
            currentPlayer={currentPlayer}
            currentPlayerCards={gameState.playerCards[currentPlayer]}
            turn={turn}
            pickCard={pickCard}
          />
        </Col>
      </Row>
      <Row style={{ height: "35%" }}>
        <Col className="m-auto">
          {currentPlayer !== null && (
            <>
              <div className="d-flex justify-content-center">
                {gameState.playerCards[currentPlayer].map((card) => {
                  return (
                    <FaceUpCard
                      key={card}
                      card={card}
                      topCard={gameState.topCard}
                      currentPlayer={currentPlayer}
                      turn={turn}
                      playCard={playCard}
                    />
                  );
                })}
              </div>

              <span className="d-flex justify-content-center pt-2">
                Player {currentPlayer}
              </span>
            </>
          )}
        </Col>
        <Col className="m-auto">
          {player4 !== null && (
            <>
              <div className="d-flex justify-content-center">
                {gameState.playerCards[player4] &&
                  gameState.playerCards[player4].map((card) => {
                    return <FaceDownCard key={card} />;
                  })}
              </div>
              <span className="d-flex justify-content-center pt-2">
                Player {player4}
              </span>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default GamePlay;
