export default function findEmptyColumn(gameboard, randomFunction) {
  const emptiesRows = gameboard.filter((row) => row.includes(''));
  const indexLastRow = emptiesRows.length - 1;

  const emptiesColumns = gameboard[indexLastRow]
    .map((column, index) => {
      if (column === '') return index;
      return null;
    })
    .filter((column) => column !== null);

  const randomColumn =
    emptiesColumns[Math.floor(randomFunction() * (emptiesColumns.length - 1))];
  return randomColumn;
}
