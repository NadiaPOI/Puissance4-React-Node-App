import React from "react";
import PropTypes from "prop-types";

import Winner from "../winner/Winner";
import Row from "./Row";

function Gameboard({
  gameboard,
  winner,
  colorWinner,
  loadGameboard,
  addPawn,
  resetGameboard
}) {
  if (gameboard === null) {
    const params = new URL(window.location.href).searchParams;
    const rows = Number(params.get("row"));
    const columns = Number(params.get("col"));

    gameboard = loadGameboard(rows, columns);

    return "loading";
  }

  const rowsElements = gameboard.map((row, indexRow) => {
    return (
      <Row
        gameboard={gameboard}
        row={row}
        key={indexRow}
        indexRow={indexRow}
        onClick={indexCol => addPawn(gameboard, indexCol, winner)}
      />
    );
  });

  return (
    <>
      {winner && <Winner player={colorWinner} onClick={resetGameboard} />}
      <table className="gameboard">
        <tbody>{rowsElements}</tbody>
      </table>
    </>
  );
}
Gameboard.defaultProps = {
  gameboard: null,
  winner: false,
  colorWinner: null
};

Gameboard.propTypes = {
  gameboard: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  winner: PropTypes.bool.isRequired,
  colorWinner: PropTypes.string,
  loadGameboard: PropTypes.func,
  addPawn: PropTypes.func,
  resetGameboard: PropTypes.func
};

export default Gameboard;
