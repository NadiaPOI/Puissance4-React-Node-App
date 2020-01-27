import addPawn from './addPawn.logic';

export default function aIAddPawn(gameboard, randomColumn) {
  return addPawn(gameboard, randomColumn, 'R');
}
