function isWinnerVerticallyReduce(
  gameboard,
  lastRow,
  currentColumn,
  colorPlayer
) {
  return gameboard.reduce(
    (prevResult, row) => {
      const alignedPawns =
        row[currentColumn] === colorPlayer ? prevResult.alignedPawns + 1 : 0;
      return {
        result: alignedPawns >= 4 || prevResult.result,
        alignedPawns
      };
    },
    {
      result: false,
      alignedPawns: 0
    }
  ).result;
}

function isWinnerHorizontallyReduce(gameboard, row, colorPlayer) {
  return gameboard[row].reduce(
    (prevResult, cell) => {
      const alignedPawns =
        cell === colorPlayer ? prevResult.alignedPawns + 1 : 0;

      return {
        result: alignedPawns >= 4 || prevResult.result,
        alignedPawns
      };
    },
    {
      result: false,
      alignedPawns: 0
    }
  ).result;
}

function isWinnerDiagonallyRight(gameboard, row, col, colorPlayer) {
  let currentColumn = col;
  let alignedPawns = 0;

  // diagonally right down
  for (let indexRow = row; indexRow < gameboard.length; indexRow++) {
    alignedPawns =
      gameboard[indexRow][currentColumn] === colorPlayer ? alignedPawns + 1 : 0;
    currentColumn += 1;

    if (alignedPawns >= 4) return true;
  }
  return false;
}

function isWinnerDiagonallyLeft(gameboard, row, col, colorPlayer) {
  let alignedPawns = 0;
  let currentColumn = col;

  // diagonally left down
  for (let indexRow = row; indexRow < gameboard.length; indexRow++) {
    alignedPawns =
      gameboard[indexRow][currentColumn] === colorPlayer ? alignedPawns + 1 : 0;
    currentColumn -= 1;

    if (alignedPawns >= 4) return true;
  }

  currentColumn = col;
  alignedPawns = 0;

  // diagonally left up
  for (let indexRow = row; indexRow >= 0; indexRow--) {
    alignedPawns =
      gameboard[indexRow][currentColumn] === colorPlayer ? alignedPawns + 1 : 0;
    currentColumn -= 1;

    if (alignedPawns >= 4) return true;
  }

  return false;
}

export default function isWinner(gameboard, row, col, colorPlayer) {
  let currentColumn = col;
  let lastRow = gameboard.length - 1;

  return (
    isWinnerVerticallyReduce(gameboard, lastRow, currentColumn, colorPlayer) ||
    isWinnerHorizontallyReduce(gameboard, row, colorPlayer) ||
    isWinnerDiagonallyRight(gameboard, row, col, colorPlayer) ||
    isWinnerDiagonallyLeft(gameboard, row, col, colorPlayer)
  );
}
