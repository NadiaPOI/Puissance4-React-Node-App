import React from 'react';
import {shallow, mount} from 'enzyme';
import {BrowserRouter as Router} from 'react-router-dom';

import Gameboard from './Gameboard';
import {mapDispatchToProps} from './GameboardWrapper';
import rootReducer from '../reducers/gameboard-reducer';

import {loadGameboard, LOAD_GAMEBOARD} from '../actions/loadGameboard-action';
import {addPawn, ADD_PAWN} from '../actions/addPawn-action';
import {
  resetGameboard,
  RESET_GAMEBOARD
} from '../actions/resetGameboard-action';

describe('Gameboard', () => {
  it('should render gameboard with 5 rows and 6 columns', () => {
    const state = rootReducer({gameboard: null}, loadGameboard(5, 6));

    const boardWrapper = mount(<Gameboard {...state} />);

    const board = boardWrapper.find('tbody').children();

    const row = boardWrapper
      .find('tr')
      .first()
      .children();

    expect(board.length).toEqual(5);
    expect(row.length).toEqual(6);
  });

  it('should call loadGameboard action when gameboard is null', () => {
    const props = {
      gameboard: null,
      winner: false,
      loadGameboard: jest.fn()
    };
    shallow(<Gameboard {...props} />);

    expect(props.loadGameboard).toBeCalled();
  });

  it('Should add a yellow pawn when a empty column is clicked', () => {
    const gameboard = [
      ['', '', '', ''],
      ['', '', '', ''],
      ['', '', '', ''],
      ['', '', '', '']
    ];

    const state = rootReducer(gameboard, {
      type: 'ADD_PAWN',
      gameboard: [
        ['', '', '', ''],
        ['', '', '', ''],
        ['', '', '', ''],
        ['', '', 'R', 'Y']
      ],
      winner: false
    });

    const boardWrapper = mount(<Gameboard {...state} />);
    const cell = boardWrapper.find('td').last();

    expect(cell.find('img').html()).toEqual('<img src="yellow.png" alt="img">');
  });

  it('Should not render the Winner component by default', () => {
    const props = {
      gameboard: [
        ['', '', '', ''],
        ['', '', '', ''],
        ['', '', '', ''],
        ['', '', '', '']
      ]
    };
    const boardWrapper = shallow(<Gameboard {...props} />);

    expect(boardWrapper.find('Winner').exists()).toBe(false);
  });

  it('Should render the Winner component when a player win', () => {
    const props = {
      gameboard: [
        ['', '', '', ''],
        ['', '', '', ''],
        ['', '', '', ''],
        ['', '', '', '']
      ],
      winner: true,
      addPawn: jest.fn()
    };

    const boardWrapper = mount(
      <Router>
        <Gameboard {...props} />
      </Router>
    );

    const clickedCell = boardWrapper.find('img').last();

    clickedCell.simulate('click');
    clickedCell.simulate('click');
    clickedCell.simulate('click');
    clickedCell.simulate('click');

    expect(boardWrapper.find('Winner').exists()).toBe(true);
  });

  it('should dispatch LOAD_GAMEBOARD action type', () => {
    const dispatch = jest.fn(() => loadGameboard(4, 4));

    mapDispatchToProps(dispatch).loadGameboard();
    expect(dispatch().type).toEqual(LOAD_GAMEBOARD);
  });

  it('should dispatch ADD_PAWN action type', () => {
    const gameboard = [
      ['', '', '', ''],
      ['', '', '', ''],
      ['', '', '', ''],
      ['', '', '', '']
    ];
    const dispatch = jest.fn(() => addPawn(gameboard, 0, 0));

    mapDispatchToProps(dispatch).addPawn(gameboard, 0, 0);
    expect(dispatch().type).toEqual(ADD_PAWN);
  });

  it('should dispatch RESET_GAMEBOARD action type', () => {
    const gameboard = [
      ['', '', '', ''],
      ['', '', '', ''],
      ['', '', '', ''],
      ['', '', '', '']
    ];
    const dispatch = jest.fn(() => resetGameboard(gameboard));

    mapDispatchToProps(dispatch).resetGameboard();
    expect(dispatch().type).toEqual(RESET_GAMEBOARD);
  });
});
