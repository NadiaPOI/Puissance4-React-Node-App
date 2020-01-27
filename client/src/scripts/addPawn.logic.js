export default function addPawn(gameboard, column, colorPlayer) {
  if (!gameboard[0].includes('')) {
    throw new Error('The gameboard is full');
  }

  if (gameboard[0][column] !== '') {
    throw new Error('The column is full');
  }

  const emptiesRows = gameboard.filter(
    (row) => !(row[column] === 'Y' || row[column] === 'R')
  );
  const lastRow = emptiesRows.length - 1;
  emptiesRows[lastRow][column] = colorPlayer;

  return {
    gameboard,
    rowPlayed: lastRow
  };
}
