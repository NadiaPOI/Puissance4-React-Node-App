import {LOAD_GAMEBOARD} from '../actions/loadGameboard-action';
import {ADD_PAWN} from '../actions/addPawn-action';
import {RESET_GAMEBOARD} from '../actions/resetGameboard-action';
import generateGameboard from 'scripts/generateGameboard.logic';

const initialState = {
  gameboard: null,
  winner: false,
  colorWinner: undefined
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_GAMEBOARD:
      return {
        ...state,
        gameboard: generateGameboard(
          action.gameboard.rows,
          action.gameboard.columns
        ),
        winner: initialState.winner,
        colorWinner: initialState.colorWinner
      };
    case ADD_PAWN:
      return {
        ...state,
        gameboard: action.gameboard,
        winner: action.winner,
        colorWinner: action.colorWinner
      };
    case RESET_GAMEBOARD:
      return {
        ...state,
        gameboard: initialState.gameboard,
        winner: initialState.winner,
        colorWinner: initialState.colorWinner
      };
    default:
      return state;
  }
}
