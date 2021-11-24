async function submitBugReport(questionData, userMessage) {
  const response = await fetch('/api/bug-report', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({ questionData, userMessage }),
  });

  if (response.json().status == 200) {
    return 'Report submitted. Thank you.';
  }

  return 'Something went wrong submitting the report. :(';
}

export default submitBugReport;
