import PropTypes from 'prop-types';
import { useState } from 'react';
import submitBugReport from '../util/submitBugReport';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

function BugReport({ questionData, toggleBugReportModal }) {
  const [message, setMessage] = useState('');

  function handleInput(e) {
    setMessage(e.target.value);
  }

  return (
    <aside id='bug-report'>
      <div className='modal'>
        <span className='close-button' onClick={() => toggleBugReportModal()}>
          <FontAwesomeIcon icon={faTimesCircle} />
        </span>
        <h3 className='row'>Submit Bug Report</h3>
        <div className='row'>
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
        <div className='row'>
          <button onClick={() => toggleBugReportModal()}>Cancel</button>
          <button onClick={() => submitBugReport(questionData, message)}>Submit</button>
        </div>
      </div>
    </aside>
  );
}

export default BugReport;

BugReport.propTypes = {
  questionData: PropTypes.object.isRequired,
  toggleBugReportModal: PropTypes.func.isRequired,
};
