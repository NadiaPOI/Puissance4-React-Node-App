export const RESET_GAMEBOARD = 'RESET_GAMEBOARD';

export function resetGameboard(gameboard, winner, colorWinner) {
  return {
    type: RESET_GAMEBOARD,
    gameboard: gameboard,
    winner: winner,
    colorWinner: colorWinner
  };
}
