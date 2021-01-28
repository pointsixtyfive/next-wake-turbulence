import PropTypes from 'prop-types';

const Aircraft = ({ data }) => {
  return (
    <div className='ac-container'>
      <div className='box name'>
        <ul className='ac-list'>
          <li>A/C</li>
          <li>{data.name}</li>
        </ul>
      </div>
      <div className='box category'>
        <ul className='ac-list'>
          <li>Category</li>
          <li>{data.category}</li>
        </ul>
      </div>
      <div className='box weight'>
        <ul className='ac-list'>
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
