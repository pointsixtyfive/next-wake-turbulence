import React from 'react';
import PropTypes from 'prop-types';
import Aircraft from './Aircraft';

const AircraftList = ({ data, backButton }) => {
  return (
    <section>
      <h2>List of Aircraft</h2>

      {data.map((aircraft) => (
        <Aircraft key={aircraft.name} data={aircraft} />
      ))}

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
