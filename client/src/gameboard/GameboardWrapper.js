import {connect} from 'react-redux';

import Gameboard from './Gameboard';

import {loadGameboard} from '../actions/loadGameboard-action';
import {addPawn} from '../actions/addPawn-action';
import {resetGameboard} from '../actions/resetGameboard-action';

export const mapStateToProps = (state) => ({
  gameboard: state.gameboard,
  winner: state.winner,
  colorWinner: state.colorWinner
});

export const mapDispatchToProps = (dispatch) => ({
  loadGameboard: (rows, columns) => dispatch(loadGameboard(rows, columns)),
  addPawn: (gameboard, indexCol, winner) =>
    dispatch(addPawn(gameboard, indexCol, winner)),
  resetGameboard: (gameboard, winner, colorWinner) =>
    dispatch(resetGameboard(gameboard, winner, colorWinner))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Gameboard);
