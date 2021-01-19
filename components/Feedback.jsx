import PropTypes from 'prop-types';

const Feedback = ({ questionData }) => {
  const { answer, lead, trail } = questionData;
  //remove the ternary operator once viewing the component on load(for debugging) is no longer needed. It will not be rendered
  //w/o data once complete
  return !answer ? null : (
    <section id='feedback'>
      <p>
        {`The correct answer is ${answer.wakeTime} minutes. `}
        {answer.waiveable === 'N/A'
          ? 'Waiveing is not applicable'
          : answer.waiveable
          ? `It is waiveable.`
          : `It is not waiveable.`}
      </p>
      <p>{`The trailing ${trail.name} is a ${trail.weightClass}, and the leading ${lead.name} is a ${lead.weightClass}.`}</p>
    </section>
  );
};

export default Feedback;

Feedback.propTypes = {
  questionData: PropTypes.object.isRequired,
};
