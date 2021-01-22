import PropTypes from 'prop-types';

const Button = ({ id, label, onClick, value, disabled, className }) => {
  return (
    <button id={id} type='button' className={className} value={value} onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};

export default Button;

Button.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]).isRequired,
  disabled: PropTypes.bool.isRequired,
  className: PropTypes.string,
};
