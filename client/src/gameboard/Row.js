import React from 'react';
import PropTypes from 'prop-types';

import Square from './Square';

export default function Row({gameboard, row, indexRow, onClick, winner}) {
  return (
    <tr row={row} key={indexRow} id={indexRow}>
      {row.map((square, indexSquare) => {
        return (
          <Square
            key={indexSquare}
            indexSquare={indexSquare}
            indexRow={indexRow}
            colorSquare={square}
            actionOnClick={() => onClick(indexSquare)}
          />
        );
      })}
    </tr>
  );
}

Row.propTypes = {
  row: PropTypes.arrayOf(PropTypes.oneOf(['', 'Y', 'R'])).isRequired,
  indexRow: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
};
