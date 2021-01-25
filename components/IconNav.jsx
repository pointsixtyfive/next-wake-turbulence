import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const IconNav = ({ setStart, page, setPage }) => {
  function acListToggle() {
    page === 'list' ? setPage('quiz') : setPage('list');
  }
  return (
    <nav className='icon-nav'>
      <a href='#' onClick={() => setStart(false)}>
        <FontAwesomeIcon icon={faInfoCircle} className='color-white' />
      </a>
      <a href='#' onClick={() => acListToggle()}>
        <FontAwesomeIcon icon={faPlane} className='color-white' />
      </a>
    </nav>
  );
};

export default IconNav;

IconNav.propTypes = {
  page: PropTypes.string.isRequired,
  setPage: PropTypes.func.isRequired,
  setStart: PropTypes.func.isRequired,
};
