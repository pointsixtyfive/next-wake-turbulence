import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ label, onClick, value, disabled }) => {
  return (
    <button type='button' value={value} onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};

export default Button;

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]).isRequired,
  disabled: PropTypes.bool.isRequired,
};
