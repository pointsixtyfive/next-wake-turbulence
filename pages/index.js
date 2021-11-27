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
import Score from '../components/Score';
import generateQuestion from '../util/wake_turbulence_quiz';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';

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
  const [score, setScore] = useState({ correct: 0, attempted: 0 });
  const [hasBeenChecked, setHasBeenChecked] = useState(false);
  const [autoAdvance, setAutoAdvance] = useState(true);
  const [bugReportData, setBugReportData] = useState({});
  const [options, setOptions] = useState({
    parallel: 5,
    opposite: 10,
    crossing: 15,
    intersection: 35,
  });

  useEffect(() => {
    let q = generateQuestion(data, options);
    setQuestionData(q);
    clearAnswer();
  }, [nextQuestion, data, options]);

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
    //save the current info for bug reports
    setBugReportData(questionData);

    const q = questionData.answer;
    for (let key in q) {
      if (q[key] != answer[key]) {
        //wrong answer
        answerNotification(false);

        if (!hasBeenChecked) {
          setHasBeenChecked(true);

          setScore((prevScore) => {
            prevScore.attempted += 1;
            return prevScore;
          });
        }

        return 'wrong answer';
      }
    }
    //correct answer
    answerNotification(true);

    if (!hasBeenChecked) {
      setHasBeenChecked(true);

      setScore((prevScore) => {
        prevScore.correct += 1;
        prevScore.attempted += 1;
        return prevScore;
      });
    }
    if (autoAdvance) {
      setTimeout(function timeoutToAdvance() {
        goToNextQuestion();
      }, 2200);
    }
    return 'correct';
  };

  function goToNextQuestion() {
    setNextQuestion(nextQuestion + 1);
    setHasBeenChecked(false);
  }

  function clearAnswer() {
    setAnswer({ wakeTime: 'None', waiveable: 'N/A' });
  }

  //Toast Nofitifcations
  //Answer feedback toast
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
      theme: 'colored',
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

  // Bug report toast
  const bugReportToastId = useRef(null);
  function bugReportNotification({ success, message }) {
    const toastOptions = {
      position: 'bottom-center',
      autoClose: 2500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: 'dark',
    };

    if (success) {
      if (!toast.isActive(bugReportToastId.current)) {
        bugReportToastId.current = toast.success(message, toastOptions);
      }
    } else {
      if (!toast.isActive(bugReportToastId.current)) {
        bugReportToastId.current = toast.error(message, { ...toastOptions, autoClose: false });
      }
    }
  }

  return (
    <div id='page'>
      <main>
        <Head>
          <title>Wake Turbulence Practice Questions</title>
        </Head>
        <div className='icon-nav-container'>
          <Score score={score} />
          <IconNav
            page={page}
            setStart={setStart}
            setPage={setPage}
            autoAdvance={autoAdvance}
            setAutoAdvance={setAutoAdvance}
          />
        </div>
        {/* Displays the list of aircraft being used to generate questions for user to reference. */}
        {page === 'list' ? (
          <AircraftList data={data} backButton={setPage} />
        ) : (
          <div>
            {/*start quiz page */}
            {start ? (
              <Question questionData={questionData} toast={bugReportNotification} bugReportData={bugReportData} />
            ) : (
              <Instructions start={setStart} options={options} setOptions={setOptions} attempts={score.attempted} />
            )}
            <Answers start={start} onClick={handleClick} answer={answer} />

            <section id='controls'>
              <Button
                label={<FontAwesomeIcon icon={faCheckCircle} className='color-green' />}
                value={0}
                onClick={() => checkAnswer()}
                disabled={!start}
                className={''}
              />
              <Button
                label={<FontAwesomeIcon icon={faChevronCircleRight} className='color-white' />}
                value={0}
                onClick={() => {
                  goToNextQuestion();
                }}
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
    </div>
  );
};

export default Index;

Index.propTypes = {
  data: PropTypes.array.isRequired,
};
