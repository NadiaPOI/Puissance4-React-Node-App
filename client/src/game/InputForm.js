import React from 'react';
import PropTypes from 'prop-types';

export default function InputForm({
  textLabel,
  name,
  placeholder,
  value,
  onChange
}) {
  return (
    <>
      <label htmlFor='row'>{textLabel}</label>
      <input
        type='number'
        name={name}
        className={name}
        placeholder={placeholder}
        min='4'
        max='50'
        value={value}
        required
        onChange={onChange}
      />
    </>
  );
}

InputForm.defaultProps = {
  value: 4
};

InputForm.propTypes = {
  textLabel: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired
};
