import PropTypes from 'prop-types';

const Score = ({ score }) => {
  return (
    <div className='score color-white'>
      <span className='score-value'>{score.correct}</span> correct of{' '}
      <span className='score-value'>{score.attempted}</span> attempted
    </div>
  );
};

export default Score;

Score.propTypes = {
  score: PropTypes.object.isRequired,
};
