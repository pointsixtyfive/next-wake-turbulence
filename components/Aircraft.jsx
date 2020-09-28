import React from 'react';
import PropTypes from 'prop-types';

const Aircraft = ({ data }) => {
  return (
    <div className='flex_container'>
      <div className='box name'>
        <ul>
          <li>A/C</li>
          <li>{data.name}</li>
        </ul>
      </div>
      <div className='box category'>
        <ul>
          <li>Category</li>
          <li>{data.category}</li>
        </ul>
      </div>
      <div className='box weight'>
        <ul>
          <li>Category</li>
          <li>{data.weightClass}</li>
        </ul>
      </div>
    </div>
  );
};

export default Aircraft;

Aircraft.propTypes = {
  data: PropTypes.object.isRequired,
};
