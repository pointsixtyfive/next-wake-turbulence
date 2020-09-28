import React from 'react';
import PropTypes from 'prop-types';
import Aircraft from 'Aircraft';

const AircraftList = ({ data }) => {
  return (
    <main>
      <h2>List of Aircraft</h2>

      {data.map((aircraft) => (
        <Aircraft key={aircraft.name} data={aircraft} />
      ))}
    </main>
  );
};

export default AircraftList;

AircraftList.propTypes = {
  data: PropTypes.array.isRequired,
};
