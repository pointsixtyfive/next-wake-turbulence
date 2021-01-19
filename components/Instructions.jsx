import PropTypes from 'prop-types';
import Button from './Button';

const Instructions = ({ start }) => {
  return (
    <div>
      <p>Here are the instructions</p>
      <Button label={'Start'} onClick={() => start(true)} value={true} disabled={false} />
    </div>
  );
};

export default Instructions;

Instructions.propTypes = {
  start: PropTypes.func.isRequired,
};
