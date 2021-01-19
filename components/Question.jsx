import PropTypes from 'prop-types';

const Question = ({ questionData }) => {
  const { trail, lead } = questionData;
  const labels = {
    Intersection: 'an intersection',
    'Full length': 'the full length',
    crossing: 'a crossing runway',
    opposite: 'opposite direction',
  };

  function depPoint(ac) {
    if (ac.runway) {
      return labels.crossing;
    }
    return labels[ac.departurePoint];
  }

  return (
    <section id='question'>
      <p>{`${trail.name} departing from ${depPoint(trail)} behind a ${lead.name} at ${depPoint(lead)}.`}</p>
    </section>
  );
};

export default Question;

Question.propTypes = {
  questionData: PropTypes.object.isRequired,
};
