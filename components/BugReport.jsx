import PropTypes from 'prop-types';
import { useState } from 'react';
import submitBugReport from '../util/submitBugReport';

function BugReport({ questionData, toggleBugReportModal }) {
  const [message, setMessage] = useState('');

  function handleInput(e) {
    setMessage(e.target.value);
  }

  return (
    <aside id='bug-report'>
      <div>Submit Bug Report</div>
      <div>
        <textarea
          name='userMessage'
          id='userMessage'
          cols='30'
          rows='10'
          autoCapitalize='sentences'
          autoComplete='off'
          autoCorrect='on'
          autoFocus
          maxLength='1000'
          placeholder='Please describe the issue'
          spellCheck='true'
          wrap='soft'
          onChange={(e) => handleInput(e)}
          value={message}
        ></textarea>
      </div>
      <div>
        <button onClick={() => toggleBugReportModal()}>Cancel</button>
        <button onClick={() => submitBugReport(questionData, message)}>Submit</button>
      </div>
    </aside>
  );
}

export default BugReport;

BugReport.propTypes = {
  questionData: PropTypes.object.isRequired,
};
