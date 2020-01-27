import React from 'react';
import {shallow} from 'enzyme';
import {Link} from 'react-router-dom';

import Winner from './Winner';
import rootReducer from '../reducers/gameboard-reducer';
import {resetGameboard} from '../actions/resetGameboard-action';

describe('Winner', () => {
  it('Should render Winner component', () => {
    const winnerWrapper = shallow(<Winner />);
    expect(winnerWrapper.exists()).toBe(true);
  });

  it('Should render a text contain yellow player win when player is Y', () => {
    const winnerWrapper = shallow(<Winner player='Y' />);
    expect(winnerWrapper.find('p').text()).toBe('Great !! Yellow player win !');
  });

  it('Should render a text contain red player win when player is R', () => {
    const winnerWrapper = shallow(<Winner player='R' />);
    expect(winnerWrapper.find('p').text()).toBe('Great !! Red player win !');
  });

  it('Should redirect to home', () => {
    const state = rootReducer(
      {
        gameboard: [
          ['Y', '', '', ''],
          ['Y', '', '', ''],
          ['Y', '', '', ''],
          ['Y', '', '', '']
        ]
      },
      {type: 'RESET_GAMEBOARD', gameboard: resetGameboard()}
    );

    shallow(
      <Winner {...state}>
        <Link to='/' />
      </Winner>
    );

    expect(document.location.pathname).toBe('/');
  });
});
