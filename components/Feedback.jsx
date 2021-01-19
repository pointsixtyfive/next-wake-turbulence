import PropTypes from 'prop-types';

const Feedback = ({ questionData }) => {
  const { answer, lead, trail } = questionData;

  return (
    <section id='feedback'>
      <p>
        {`The correct answer is ${answer.wakeTime} minutes.`}
        {answer.waiveable === 'N/A'
          ? 'Waiveing is not applicable'
          : answer.waiveable
          ? `It is waiveable.`
          : `It is not waiveable.`}
      </p>
      <p>{`${trail.name} is a ${trail.weightClass}, and a ${lead.name} is a ${lead.weightClass}.`}</p>
    </section>
  );
};

export default Feedback;

Feedback.propTypes = {
  questionData: PropTypes.object.isRequired,
};
