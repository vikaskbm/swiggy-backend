import React, { useEffect } from "react";
import CardBack from "../../../assets/card-back.jpg";

import { isPlayingCardPossible } from "../../../helpers/getGameId";
const FaceDownCard = ({
  deck,
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

  useEffect(() => {
    if (myTurn && playableCards.length === 0 && deck?.length === 0) {
      pickCard();
    }
  }, []);

  const handlePickCard = () => {
    pickCard();
  };

  return (
    <div
      className="mx-1"
      style={{
        pointerEvents: myTurn && playableCards.length === 0 ? "auto" : "none",
        boxShadow:
          myTurn && playableCards.length === 0
            ? "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset"
            : "",
      }}
      onClick={() => {
        handlePickCard();
      }}
    >
      <img src={CardBack} alt="Card" height={"150rem"} />
    </div>
  );
};

export default FaceDownCard;
