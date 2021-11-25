import PropTypes from 'prop-types';
import { useState } from 'react';
import submitBugReport from '../util/submitBugReport';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faSpinner } from '@fortawesome/free-solid-svg-icons';

function BugReport({ toggleBugReportModal, toast, bugReportData }) {
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleInput(e) {
    setMessage(e.target.value);
  }

  async function handleSubmit() {
    setIsSubmitting(true);
    try {
      const res = await submitBugReport(bugReportData, message);

      if (res.success) {
        //show success toast
        toast(res);
        setIsSubmitting(false);
        toggleBugReportModal();
        return 1;
      }

      if (!res.success) {
        //show failure toast
        toast(res);
        setIsSubmitting(false);
        return -1;
      }
    } catch (e) {
      //show failure toast
      toast({ success: false, message: 'There was an error: ', e });
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
            autoCapitalize='sentences'
            autoComplete='off'
            autoCorrect='on'
            autoFocus
            maxLength='1000'
            placeholder='Please describe the issue. Question data is automaticaly sent with the report.'
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
  bugReportData: PropTypes.object.isRequired,
  toggleBugReportModal: PropTypes.func.isRequired,
  toast: PropTypes.func.isRequired,
};
