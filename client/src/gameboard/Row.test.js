import React from 'react';
import {shallow} from 'enzyme';

import Row from './Row';

describe('Row', () => {
  it('Should render Rows', () => {
    const props = {
      gameboard: new Array(5),
      row: new Array(5),
      indexRow: 0,
      onClick: jest.fn()
    };
    const rowWrapper = shallow(<Row {...props} />);
    expect(rowWrapper.exists()).toBe(true);
  });
});
