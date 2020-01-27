import React from 'react';
import {shallow} from 'enzyme';

import InputForm from './InputForm';

describe('InputForm', () => {
  it('Should call onChange when change value of InputForm', () => {
    const mockChange = jest.fn();
    const value = 5;

    const inputWrapper = shallow(
      <InputForm
        onChange={mockChange}
        textLabel='Please choose the number of rows :'
        name='row'
      />
    );
    inputWrapper
      .find('input')
      .first()
      .simulate('change', {target: {value}});

    expect(mockChange).toBeCalledWith({target: {value}});
  });
});
