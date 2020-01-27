export default function generateGameboard(lengthRow, lengthColumn) {
  const gameboard = new Array(lengthRow)
    .fill(null)
    .map(() => new Array(lengthColumn).fill(''));
  return gameboard;
}
