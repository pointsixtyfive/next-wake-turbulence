//todo: this needs to convert to an api endpoint. the env vars arent available to the front end, plus cors
async function submitBugReport(questionInfo, userMessage) {
  const message = { questionInfo, userMessage };
  const xfPostThreadParams = { node_id: 2, title: 'Some Title', message: message };
  const body = new URLSearchParams(xfPostThreadParams);

  const response = await fetch('https://pointsixtyfive.com/dev/api', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      'XF-Api-Key': xfKey,
      'XF-Api-User': xfUser,
    },
    body: body,
  });

  return response.json();
}

export default submitBugReport;

//for encoding body as form urlencoded
//https://stackoverflow.com/questions/35325370/how-do-i-post-a-x-www-form-urlencoded-request-using-fetch
