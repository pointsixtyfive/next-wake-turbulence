import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { connectToDatabase } from '../util/mongodb';
import Answers from '../components/Answers';
import AircraftList from '../components/AircraftList';
import Instructions from '../components/Instructions';
import Question from '../components/Question';
import Button from '../components/Button';
import IconNav from '../components/IconNav';
import generateQuestion from '../util/wake_turbulence_quiz';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faChevronCircleRight, faCopyright } from '@fortawesome/free-solid-svg-icons';

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
    const button = e.target.id;
    switch (button) {
      case 'none':
        tempAnswer.waiveable = 'N/A';
        tempAnswer.wakeTime = 'None';
        break;
      case 'waive':
        tempAnswer.waiveable = true;
        break;
      case 'nowaive':
        tempAnswer.waiveable = false;
        break;
      default:
        tempAnswer.wakeTime = e.target.value;
        break;
    }

    setAnswer(tempAnswer);
  };

  const checkAnswer = () => {
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

  const toastId = useRef(null);
  const answerNotification = (correct) => {
    const toastOptions = {
      position: 'bottom-center',
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    };

    if (correct) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.success(`Correct`, toastOptions);
      }
    } else {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.error('Incorrect', toastOptions);
      }
    }
  };

  return (
    <main>
      <Head>
        <title>Wake Turbulence Practice Questions</title>
      </Head>
      <div className='icon-nav-container'>
        <IconNav page={page} setStart={setStart} setPage={setPage} />
      </div>
      {/* Displays the list of aircraft being used to generate questions for user to reference. */}
      {page === 'list' ? (
        <AircraftList data={data} backButton={setPage} />
      ) : (
        <div>
          {/*start quiz page */}
          {start ? <Question questionData={questionData} /> : <Instructions start={setStart} />}
          <Answers start={start} onClick={handleClick} answer={answer} />

          <section id='controls'>
            <Button
              label={<FontAwesomeIcon icon={faCheckCircle} className='color-green' />}
              value={0}
              onClick={() => checkAnswer()}
              disabled={!start}
              className={''}
            />
            {/* <Button label={'Clear'} value={0} onClick={() => clearAnswer()} disabled={!start} className={'big'} /> */}
            <Button
              label={<FontAwesomeIcon icon={faChevronCircleRight} className='color-white' />}
              value={0}
              onClick={() => setNextQuestion(nextQuestion + 1)}
              disabled={!start}
              className={''}
            />
          </section>
        </div>
      )}
      {/*end of quiz page*/}
      <footer className='footer'>
        <img src='/circle-logo.svg' alt='pointsixtyfive logo' /> <span className='color-white'>pointSixtyfive</span>
      </footer>
    </main>
  );
};

export default Index;

Index.propTypes = {
  data: PropTypes.array.isRequired,
};
