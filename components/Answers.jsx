import { useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

const Answers = ({ answer, start, onClick }) => {
  useEffect(() => {
    console.log('useEffect ', answer);
  }, [answer]);

  return (
    <section id='answer'>
      <Button
        id='none'
        label={'None'}
        value={'None'}
        onClick={(e) => onClick(e)}
        className={'none'}
        disabled={!start}
      />
      <Button id='two' label={'2 Minutes'} value={2} onClick={(e) => onClick(e)} className={'none'} disabled={!start} />
      <Button
        id='three'
        label={'3 Minutes'}
        value={3}
        onClick={(e) => onClick(e)}
        className={'none'}
        disabled={!start}
      />
      <Button
        id='four'
        label={'4 Minutes'}
        value={4}
        onClick={(e) => onClick(e)}
        className={'none'}
        disabled={!start}
      />
      <Button
        id='waive'
        label={'Waivable'}
        value={true}
        onClick={(e) => onClick(e)}
        className={'none'}
        disabled={!start}
      />

      <div id='user-answer'>
        Your answer: {answer.wakeTime == 0 ? 'Not applicable' : `${answer.wakeTime} minutes`}{' '}
        {answer.waiveable === true ? ', Waivable' : !answer.waiveable ? ', Not waivable' : 'Not applicable'}
      </div>
    </section>
  );
};

export default Answers;

Answers.propTypes = {
  answer: PropTypes.object.isRequired,
  start: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};
