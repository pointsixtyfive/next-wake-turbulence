import PropTypes from 'prop-types';
import { useState } from 'react';
import submitBugReport from '../util/submitBugReport';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faSpinner } from '@fortawesome/free-solid-svg-icons';

function BugReport({ questionData, toggleBugReportModal }) {
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleInput(e) {
    setMessage(e.target.value);
  }

  async function handleSubmit() {
    setIsSubmitting(true);
    try {
      const res = await submitBugReport(questionData, message);
      console.log(res);
      if (res.success) {
        //show success toast
        setIsSubmitting(false);
        toggleBugReportModal();
        return 1;
      }

      if (!res.success) {
        //show failure toast

        setIsSubmitting(false);
        return -1;
      }
    } catch (e) {
      //show failure toast
      setIsSubmitting(false);

      return -1;
    }
  }

  return (
    <aside id='bug-report'>
      {isSubmitting ? (
        <span className='spinner'>
          <FontAwesomeIcon icon={faSpinner} pulse />
        </span>
      ) : null}
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
          <button onClick={() => toggleBugReportModal()} disabled={isSubmitting}>
            Cancel
          </button>
          <button onClick={() => handleSubmit()} disabled={isSubmitting}>
            Submit
          </button>
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
