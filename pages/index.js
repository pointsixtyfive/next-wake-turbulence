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
  const [answer, setAnswer] = useState({ wakeTime: 'None', waiveable: 'N/A' });

  useEffect(() => {
    let q = generateQuestion(data);
    setQuestionData(q);
  }, [nextQuestion, data]);

  const handleClick = (e) => {
    const tempAnswer = Object.assign({}, answer);

    if (e.target.id == 'waive') {
      tempAnswer.waiveable == 'N/A'
        ? (tempAnswer.waiveable = true)
        : tempAnswer.waiveable == true
        ? (tempAnswer.waiveable = false)
        : (tempAnswer.waiveable = 'N/A');
    } else {
      tempAnswer.wakeTime = e.target.value;
    }

    setAnswer(tempAnswer);
  };

  const checkAnswer = () => {
    console.log('Q: ', questionData, 'A: ', answer);
    const q = questionData.answer;

    for (let key in q) {
      if (q[key] !== answer[key]) {
        console.log('Wrong');
        return 'Wrong answer.';
      }
    }
    console.log('Correct');
    return 'Correct';
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

      <Answers start={start} onClick={handleClick} answer={answer} />

      <section id='controls'>
        <Button label={'Submit'} value={0} onClick={(e) => checkAnswer(e)} disabled={!start} className={'big'} />
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
