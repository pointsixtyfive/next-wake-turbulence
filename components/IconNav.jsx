import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const IconNav = ({ setStart, setPage }) => {
  return (
    <nav className='icon-nav'>
      <a href='#' onClick={() => setStart(false)}>
        <FontAwesomeIcon icon={faInfoCircle} className='color-white' />
      </a>
      <a href='#' onClick={() => setPage('list')}>
        <FontAwesomeIcon icon={faPlane} className='color-white' />
      </a>
    </nav>
  );
};

export default IconNav;

IconNav.propTypes = {
  setPage: PropTypes.func.isRequired,
  setStart: PropTypes.func.isRequired,
};
