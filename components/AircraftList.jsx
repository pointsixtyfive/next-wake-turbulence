import PropTypes from 'prop-types';
import Aircraft from './Aircraft';

const AircraftList = ({ data, backButton }) => {
  return (
    <section id='aircraft-list'>
      <h2>List of Aircraft</h2>
      <div className='flex_container'>
        {data.map((aircraft) => (
          <Aircraft key={aircraft.name} data={aircraft} />
        ))}
      </div>
      <button id='back' onClick={() => backButton('quiz')}>
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
