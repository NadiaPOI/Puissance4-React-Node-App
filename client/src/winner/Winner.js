import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function Winner({ player, onClick }) {
  return (
    <div className="displayWinner">
      <p>Great !! {player === "Y" ? "Yellow" : "Red"} player win !</p>
      <Link className="restart" to="/" onClick={onClick}>
        Start again
      </Link>
    </div>
  );
}

Winner.propTypes = {
  player: PropTypes.string
};
