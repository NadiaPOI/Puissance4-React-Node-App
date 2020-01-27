import {default as addPawnLogic} from 'scripts/addPawn.logic';
import aIAddPawn from 'scripts/aIAddPawn.logic';
import findEmptyColumn from 'scripts/findEmptyColumns.logic';
import isWinner from 'scripts/isWinner.logic';

export const ADD_PAWN = 'ADD_PAWN';

export function addPawn(gameboard, indexCol, winner) {
  const gameboardAfterPlay = gameboard.slice();

  if (winner) {
    return {};
  }

  const {rowPlayed: YRowPlayed} = addPawnLogic(
    gameboardAfterPlay,
    indexCol,
    'Y'
  );

  const isYWinner = isWinner(gameboard, YRowPlayed, indexCol, 'Y');

  let isRWinner = false;

  if (!isYWinner) {
    const randomColumn = findEmptyColumn(gameboard, Math.random);
    const {rowPlayed: RRowPlayed} = aIAddPawn(gameboard, randomColumn);
    isRWinner = isWinner(gameboard, RRowPlayed, randomColumn, 'R');
  }

  const colorWinner = isYWinner ? 'Y' : isRWinner ? 'R' : null;

  return {
    type: ADD_PAWN,
    gameboard: gameboardAfterPlay,
    winner: winner || !!colorWinner,
    colorWinner: colorWinner
  };
}
