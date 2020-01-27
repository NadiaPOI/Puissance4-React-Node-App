import React from 'react';
import {shallow} from 'enzyme';

import Square from './Square';

describe('Square', () => {
  let props;
  let squareWrapper;

  beforeEach(() => {
    props = {
      indexRow: 0,
      indexSquare: 0,
      colorSquare: '',
      actionOnClick: jest.fn()
    };

    squareWrapper = shallow(<Square {...props} />);
  });

  it('Should render empty square on load', () => {
    const pathSquare = squareWrapper.find('img').prop('src');
    expect(pathSquare).toBe('empty.png');
  });

  it('Should call actionOnclick when you click on Square', () => {
    squareWrapper.simulate('click');
    expect(props.actionOnClick).toBeCalled();
  });

  it('Should render yellow pawn when you click on square', () => {
    const yellowSquareWrapper = shallow(<Square {...props} colorSquare='Y' />);
    const pathSquare = yellowSquareWrapper.find('img').prop('src');
    expect(pathSquare).toBe('yellow.png');
  });

  it('Should render red pawn when you click on square', () => {
    const redSquareWrapper = shallow(<Square {...props} colorSquare='R' />);
    const pathSquare = redSquareWrapper.find('img').prop('src');
    expect(pathSquare).toBe('red.png');
  });
});
