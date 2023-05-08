import React from "react";

import { Card } from "react-bootstrap";

import { FaUser } from "react-icons/fa";

import { COLOR_MAPPING, BORDER_COLOR_MAPPING } from "./constants.js";

const PlayerCard = ({ player, me }) => {
  return (
    <Card
      border={me ? BORDER_COLOR_MAPPING[player] : ""}
      style={{
        width: me ? "20rem" : "19rem",
        borderRadius: me ? 8 : 6,
        position: "relative",
      }}
      className="py-5 m-1"
    >
      <FaUser className="m-auto" size="6em" color={COLOR_MAPPING[player]} />
      {/* <FontAwesomeIcon icon={faUser} size="6x" color={COLOR_MAPPING[player]} /> */}
      <></>

      <Card.Body>
        <Card.Title className="text-center mt-3">Player {player}</Card.Title>

        {me ? (
          <Card.Subtitle className="text-center mb-2 text-muted">
            <strong>You</strong>
          </Card.Subtitle>
        ) : (
          <></>
        )}
      </Card.Body>
    </Card>
  );
};

export default PlayerCard;
