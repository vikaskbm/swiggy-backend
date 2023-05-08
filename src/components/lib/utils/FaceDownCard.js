import React from "react";
import CardBack from "../../../assets/card-back.jpg";

import { isPlayingCardPossible } from "../../../helpers/getGameId";
const FaceDownCard = ({
  topCard,
  currentPlayer,
  turn,
  currentPlayerCards = [],
  pickCard,
}) => {
  const myTurn = turn === currentPlayer;
  const playableCards = currentPlayerCards.filter((card) =>
    isPlayingCardPossible(card, topCard)
  );

  const handlePickCard = () => {
    pickCard();
  };

  return (
    <>
      <div
        className="mx-1"
        style={{
          pointerEvents: myTurn && playableCards.length === 0 ? "auto" : "none",
        }}
        onClick={() => {
          handlePickCard();
        }}
      >
        <img src={CardBack} alt="Card" height={"150rem"} />
      </div>
    </>
  );
};

export default FaceDownCard;
