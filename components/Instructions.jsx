import PropTypes from 'prop-types';
import Button from './Button';
import Options from './Options';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlane,
  faCheckCircle,
  faChevronCircleRight,
  faInfoCircle,
  faCaretSquareRight,
} from '@fortawesome/free-solid-svg-icons';

const Instructions = ({ start, options, setOptions, attempts }) => {
  return (
    <section id='instructions'>
      <p>
        Qustions are randomly generated. Use the options below to increase/decrease the rate at which an aircraft is
        placed at that position. Use 0 to disable that position. Parallel runways are 2500&apos; apart, and flight paths
        do not cross.
      </p>

      <p>
        Select the wake turbulence time requirement and if that requirement is waiveable or not. Use the buttons below
        to enter your answer, then check it with the <FontAwesomeIcon icon={faCheckCircle} className='color-green' />{' '}
        button. Go to the next question with the <FontAwesomeIcon icon={faChevronCircleRight} className='color-white' />{' '}
        button. Return to these instructions by clicking the{' '}
        <FontAwesomeIcon icon={faInfoCircle} className='color-white' />. View the list of aircraft and thier
        characteristics used in the questions with the <FontAwesomeIcon icon={faPlane} className='color-white' /> icon.{' '}
        <FontAwesomeIcon icon={faCaretSquareRight} className='color-white' /> toggles auto-advancing to the next
        question after a correct answer.
      </p>

      <Options options={options} setOptions={setOptions} />
      <Button
        id={'start'}
        label={!attempts ? 'Start' : 'Continue'}
        onClick={() => start(true)}
        value={true}
        disabled={false}
      />
    </section>
  );
};

export default Instructions;

Instructions.propTypes = {
  start: PropTypes.func.isRequired,
  options: PropTypes.object.isRequired,
  setOptions: PropTypes.func.isRequired,
  attempts: PropTypes.number,
};
