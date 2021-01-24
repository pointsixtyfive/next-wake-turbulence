import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane } from '@fortawesome/free-solid-svg-icons';

const Question = ({ questionData }) => {
  const { trail, lead } = questionData;
  const labels = {
    intersection: 'an intersection',
    'full length': 'the full length',
    crossing: 'a crossing runway',
    opposite: 'opposite direction',
  };

  function depPoint(ac) {
    if (ac.runway) {
      return labels.crossing;
    }
    return labels[ac.departurePoint];
  }

  function position(ac, acId) {
    const list = [acId];

    if (ac.runway) {
      list.push(ac.runway);
      return list.join(' ');
    }

    if (ac.departurePoint === 'full length') {
      list.push('full');
    } else {
      list.push(ac.departurePoint);
    }

    return list.join(' ');
  }

  return (
    <section id='question'>
      <div className='airportContainer'>
        <div className='legend'>
          <div className='legend-lead'>
            <span className='text'>Lead </span>
            <FontAwesomeIcon icon={faPlane} /> {lead.name}
          </div>

          <div className='legend-trail'>
            <span className='text'>Trail </span>
            <FontAwesomeIcon icon={faPlane} /> {trail.name}
          </div>
        </div>
        <FontAwesomeIcon icon={faPlane} className={position(lead, 'lead')} />
        <FontAwesomeIcon icon={faPlane} className={position(trail, 'trail')} />
        <img src='./airport.svg' alt='Academy Airport' className='airport' />
      </div>
      <p>{`${trail.name} departing from ${depPoint(trail)} behind a ${lead.name} at ${depPoint(lead)}.`}</p>
    </section>
  );
};

export default Question;

Question.propTypes = {
  questionData: PropTypes.object.isRequired,
};
