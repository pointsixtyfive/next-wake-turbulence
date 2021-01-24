import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { connectToDatabase } from '../util/mongodb';
import Answers from '../components/Answers';
import AircraftList from '../components/AircraftList';
import Instructions from '../components/Instructions';
import Question from '../components/Question';
import Button from '../components/Button';
import generateQuestion from '../util/wake_turbulence_quiz';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

export async function getStaticProps() {
  const { db } = await connectToDatabase();

  const data = await db.collection('aircraft').find().project({ _id: 0 }).toArray();

  return {
    props: { data },
  };
}

toast.configure();

const Index = ({ data }) => {
  const [start, setStart] = useState(false);
  const [page, setPage] = useState('quiz');
  const [questionData, setQuestionData] = useState({});
  const [nextQuestion, setNextQuestion] = useState(1);
  const [answer, setAnswer] = useState({ wakeTime: 'None', waiveable: 'N/A' });

  useEffect(() => {
    let q = generateQuestion(data);
    setQuestionData(q);
    clearAnswer();
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
      if (q[key] != answer[key]) {
        //wrong answer
        answerNotification(false);
        return 'wrong answer';
      }
    }
    //correct answer
    answerNotification(true);
    return 'correct';
  };

  const clearAnswer = () => {
    setAnswer({ wakeTime: 'None', waiveable: 'N/A' });
  };

  const answerNotification = (correct) => {
    const toastOptions = {
      position: 'bottom-center',
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      toastId: 'toaaast',
    };

    const words = ['Correct', 'Yup!', 'That is correct.', 'Right on', '+1', 'Nailed it', 'Beast mode'];
    const random = Math.floor(Math.random() + words.length);
    if (correct) {
      toast.success(`Correct`, toastOptions);
    } else {
      toast.error('You suck', toastOptions);
    }
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
        <Button label={'Check'} value={0} onClick={() => checkAnswer()} disabled={!start} className={'big'} />
        <Button label={'Clear'} value={0} onClick={() => clearAnswer()} disabled={!start} className={'big'} />
        <Button
          label={'Next'}
          value={0}
          onClick={() => setNextQuestion(nextQuestion + 1)}
          disabled={!start}
          className={'big'}
        />
      </section>

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
