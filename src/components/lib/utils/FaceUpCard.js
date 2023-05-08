import React from "react";
import { Card } from "react-bootstrap";

import { GiClubs, GiHearts, GiDiamonds, GiSpades } from "react-icons/gi";

import { isPlayingCardPossible } from "../../../helpers/getGameId";

const IconComponent = ({ suite }) => {
  if (suite === "S") {
    return <GiSpades size="5em" className="m-auto" color="black" />;
  }
  if (suite === "H") {
    return <GiHearts size="5em" className="m-auto" color="red" />;
  }
  if (suite === "C") {
    return <GiClubs size="5em" className="m-auto" color="black" />;
  }
  if (suite === "D") {
    return <GiDiamonds size="5em" className="m-auto" color="red" />;
  }
  return <></>;
};

const FaceUpCard = ({
  card,
  topCard = null,
  playCard,
  currentPlayer,
  turn,
}) => {
  const suite = card[0];
  const rank = card[2] + (card.length === 4 ? card[3] : "");

  const myTurn = turn === currentPlayer;
  const isPossible = isPlayingCardPossible(card, topCard);

  const handlePlayCard = () => {
    playCard(card);
  };

  return (
    <Card
      border={myTurn && isPossible ? "danger" : ""}
      style={{
        pointerEvents: myTurn && isPossible ? "auto" : "none",
        position: "relative",
      }}
      className="mx-1 p-2 h-50"
      onClick={() => handlePlayCard()}
    >
      <IconComponent className="" suite={suite} />
      <></>
      <Card.Body className="p-0">
        <Card.Title className="text-center mt-2 fs-2">{rank}</Card.Title>
      </Card.Body>
    </Card>
  );
};

export default FaceUpCard;
