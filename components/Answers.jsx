import PropTypes from 'prop-types';
import Button from './Button';

const Answers = ({ start, onClick }) => {
  return (
    <section id='answer'>
      <Button label={'None'} value={0} onClick={(e) => onClick(e)} disabled={!start} />
      <Button label={'2 Minutes'} value={2} onClick={(e) => onClick(e)} disabled={!start} />
      <Button label={'3 Minutes'} value={3} onClick={(e) => onClick(e)} disabled={!start} />
      <Button label={'4 Minutes'} value={4} onClick={(e) => onClick(e)} disabled={!start} />
      <Button label={'Waivable'} value={true} onClick={(e) => onClick(e)} disabled={!start} />
    </section>
  );
};

export default Answers;

Answers.propTypes = {
  start: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};
