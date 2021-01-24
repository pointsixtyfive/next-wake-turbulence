import PropTypes from 'prop-types';
import Button from './Button';

const Instructions = ({ start }) => {
  return (
    <section id='instructions'>
      <p>Qustions are randomly generated. Aircraft positions are as follows: </p>
      <ul>
        <li>Full length</li>
        <li>Intersection on the same runway</li>
        <li>Opposite direction</li>
        <li>Crossing runway</li>
      </ul>
      <p>
        Select the wake turbulence time requirement and if that requirement is waivealbe or not. Use the buttons below
        to enter your answer, then check it with the &apos;Check&apos; button. Clear your answer or go to the next
        question with the appropriate buttons.
      </p>
      <p>Click the start button to begin.</p>
      <Button id={'start'} label={'Start'} onClick={() => start(true)} value={true} disabled={false} />
    </section>
  );
};

export default Instructions;

Instructions.propTypes = {
  start: PropTypes.func.isRequired,
};
