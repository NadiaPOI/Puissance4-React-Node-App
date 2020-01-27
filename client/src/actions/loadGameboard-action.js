export const LOAD_GAMEBOARD = 'LOAD_GAMEBOARD';

export const loadGameboard = (rows, columns) => ({
  type: LOAD_GAMEBOARD,
  gameboard: {rows: rows, columns: columns},
  winner: false,
  colorWinner: undefined
});
