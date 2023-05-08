export const isPlayingCardPossible = (card, topCard) => {
  const suite = card[0];
  const rank = card[2];

  const topCardSuite = topCard ? topCard[0] : "";
  const topCardRank = topCard ? topCard[2] : "";

  return topCard
    ? topCardRank === rank || topCardSuite === suite
      ? true
      : false
    : false;
};
