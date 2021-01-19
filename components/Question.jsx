import PropTypes from 'prop-types';

const Question = ({ questionData }) => {
  const { trail, lead } = questionData;

  return (
    <section id='question'>
      <p>{`${trail.name} departing from ${trail.departurePoint} behind a ${lead.name} at ${lead.departurePoint}.`}</p>
    </section>
  );
};

export default Question;

Question.propTypes = {
  questionData: PropTypes.object.isRequired,
};
