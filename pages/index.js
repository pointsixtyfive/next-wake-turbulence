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
  const { client, db } = await connectToDatabase();
  const isConnected = await client.isConnected(); // Returns true or false

  const data = await db.collection('aircraft').find().project({ _id: 0 }).toArray();

  return {
    props: { isConnected, data },
  };
}

const Index = ({ isConnected, data }) => {
  const [start, setStart] = useState(false);
  const [page, setPage] = useState('list');
  const [showFeedback, setShowFeedback] = useState(false);
  const [questionData, setQuestionData] = useState({});
  const [nextQuestion, setNextQuestion] = useState(1);

  useEffect(() => {
    let q = generateQuestion();
    setQuestionData(q);
  }, [nextQuestion]);

  const handleClick = (e) => {
    console.log(e.target.value);
  };

  return (
    <main>
      <Head>
        <title>Wake Turbulence Practice Quiz</title>
      </Head>

      {page === 'list' ? <AircraftList data={data} backButton={setPage} /> : null}

      {/*start quiz page */}
      {start ? <Question questionData={questionData} /> : <Instructions start={setStart} />}

      <Answers start={start} onClick={handleClick} />

      <Button label={'None'} value={0} onClick={(e) => handleClick(e)} disabled={!start} />

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

      {isConnected ? (
        <h2 className='subtitle'>You are connected to MongoDB</h2>
      ) : (
        <h2 className='subtitle'>
          You are NOT connected to MongoDB. Check the <code>README.md</code> for instructions.
        </h2>
      )}
    </main>
  );
};

export default Index;

Index.propTypes = {
  isConnected: PropTypes.bool,
  data: PropTypes.array.isRequired,
};
