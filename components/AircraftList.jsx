import PropTypes from 'prop-types';
import Aircraft from './Aircraft';

const AircraftList = ({ data, backButton }) => {
  return (
    <section id='aircraft-list' className='color-white'>
      <h2>List of Aircraft</h2>
      <div className='ac-container'>
        {data.map((aircraft) => (
          <Aircraft key={aircraft.name} data={aircraft} />
        ))}
      </div>
      <button id='back' className='button' onClick={() => backButton('quiz')}>
        Back to quiz
      </button>
    </section>
  );
};

export default AircraftList;

AircraftList.propTypes = {
  data: PropTypes.array.isRequired,
  backButton: PropTypes.func.isRequired,
};
