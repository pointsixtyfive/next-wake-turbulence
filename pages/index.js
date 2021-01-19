import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { connectToDatabase } from '../util/mongodb';
import Answers from '../components/Answers';
import AircraftList from '../components/AircraftList';
import Feedback from '../components/Feedback';
import Instructions from '../components/Instructions';
import Question from '../components/Question';
import Button from '../components/Button';
import generateQuestion from '../util/wake_turbulence_quiz';

export async function getStaticProps() {
  const { db } = await connectToDatabase();

  const data = await db.collection('aircraft').find().project({ _id: 0 }).toArray();

  return {
    props: { data },
  };
}

const Index = ({ data }) => {
  const [start, setStart] = useState(false);
  const [page, setPage] = useState('quiz');
  const [showFeedback, setShowFeedback] = useState(false);
  const [questionData, setQuestionData] = useState({});
  const [nextQuestion, setNextQuestion] = useState(1);

  useEffect(() => {
    let q = generateQuestion(data);
    setQuestionData(q);
  }, [nextQuestion, data]);

  const handleClick = (e) => {
    console.log(e.target.value);
  };

  return (
    <main>
      <Head>
        <title>Wake Turbulence Practice Quiz</title>
      </Head>

      {/* Displays the list of aircraft being used to generate questions for user to reference. */}
      {page === 'list' ? <AircraftList data={data} backButton={setPage} /> : null}

      {/*start quiz page */}
      {start ? <Question questionData={questionData} /> : <Instructions start={setStart} />}

      <Answers start={start} onClick={handleClick} />

      <section id='controls'>
        <Button label={'Submit'} value={0} onClick={(e) => handleClick(e)} disabled={!start} className={'big'} />
        <Button label={'Reset'} value={0} onClick={(e) => handleClick(e)} disabled={!start} className={'big'} />
        <Button
          label={'Next'}
          value={0}
          onClick={() => setNextQuestion(nextQuestion + 1)}
          disabled={!start}
          className={'big'}
        />
      </section>

      {showFeedback && <Feedback questionData={questionData} />}
      {/*end of quiz page*/}

      <footer className='footer'>
        <a href='#' onClick={() => setStart(false)}>
          Go back to the instructions.
        </a>
      </footer>
    </main>
  );
};

export default Index;

Index.propTypes = {
  data: PropTypes.array.isRequired,
};
