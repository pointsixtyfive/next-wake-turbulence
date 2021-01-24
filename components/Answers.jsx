import { useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

const Answers = ({ answer, start, onClick }) => {
  useEffect(() => {
    console.log('useEffect ', answer);
  }, [answer]);

  return (
    <section id='answer'>
      <div id='user-answer'>
        <span>Wake Time: </span>
        <span>{answer.wakeTime == 'None' ? 'Not applicable' : `${answer.wakeTime} minutes`}</span>
        <span>Waivable: </span>
        <span>{answer.waiveable === true ? 'Yes' : !answer.waiveable ? 'No' : 'Not applicable'}</span>
      </div>
      <div>
        <Button
          id='none'
          label={'None'}
          value={'None'}
          onClick={(e) => onClick(e)}
          className={'none'}
          disabled={!start}
        />
        <Button
          id='two'
          label={'2 Minutes'}
          value={2}
          onClick={(e) => onClick(e)}
          className={'none'}
          disabled={!start}
        />
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
      </div>
      <div>
        <Button
          id='waive'
          label={'Waivable'}
          value={true}
          onClick={(e) => onClick(e)}
          className={'none'}
          disabled={!start}
        />
        <Button
          id='nowaive'
          label={'Not Waivable'}
          value={true}
          onClick={(e) => onClick(e)}
          className={'none'}
          disabled={!start}
        />
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
