import React, { useState } from 'react';
import Head from 'next/head';
import { connectToDatabase } from '../util/mongodb';
import Question from '../components/Question';
import Instructions from '../components/Instructions';
import Button from '../components/Button';
import Answers from '../components/Answers';

export async function getServerSideProps(context) {
  const { client } = await connectToDatabase();

  const isConnected = await client.isConnected(); // Returns true or false

  return {
    props: { isConnected },
  };
}

const Index = ({ isConnected }) => {
  const [start, setStart] = useState(false);
  const [timeAnswer, setTimeAnswer] = useState('');
  const [waiveAnswer, setWaiveAnswer] = useState(false);

  const onClick = () => {
    console.log('I was clicked');
  };

  return (
    <main>
      {start ? <Question /> : <Instructions start={setStart} />}

      <Answers start={start} onClick={onClick} />

      <form action='' method='post' name='answer'>
        <fieldset>
          <legend>Time Requirement</legend>
          <label htmlFor='two'>Two Minutes</label> <input type='radio' id='two' name='time' />
          <label htmlFor='three'>Three Minutes</label> <input type='radio' id='three' name='time' />
          <label htmlFor='four'>Four Minutes</label> <input type='radio' id='four' name='time' />
          <label htmlFor='none'>None</label> <input type='radio' id='none' name='time' />
        </fieldset>

        <fieldset>
          <legend>Waiveable</legend>
          <label htmlFor='waive'>Yes</label> <input type='radio' id='waive' name='waive' />{' '}
          <label htmlFor='nonwaive'>No</label>
          <input type='radio' id='nonwaive' name='waive' />
        </fieldset>

        <input type='submit' className='big' />
        <input type='reset' className='big' />
      </form>

      <div className='flex_container'>
        <div id='answer'>
          <p>$answer</p>
        </div>

        <div id='feedback'>
          <table>
            <tbody>
              <tr>
                <th scope='col'>&nbsp;</th>
                <th scope='col'>Aircraft</th>
                <th scope='col'>Weight Class</th>
              </tr>
              <tr>
                <th scope='row'>Lead</th>
                <td>$lead</td>
                <td>$weight</td>
              </tr>
              <tr>
                <th scope='row'>Trail</th>
                <td>$trail</td>
                <td>$weight</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className='footer'>
        <a href='#' onClick={() => setStart(false)}>
          Go back to the instructions.
        </a>
      </div>

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
