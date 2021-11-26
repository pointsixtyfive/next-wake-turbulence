import convertToPostFormat from '../../util/convertToPostFormat';
import config from '../../util/xfConfig';

export default async (req, res) => {
  const { method } = req;
  if (method !== 'POST') {
    res.status(405);
  }

  const xfUser = process.env.XF_API_USER;
  const xfKey = process.env.XF_API_KEY;
  const { boardUrl, forumIdToSubmitTo, threadPrefixId, threadTitle } = config;
  const xfPostThreadParams = {
    node_id: forumIdToSubmitTo,
    title: threadTitle,
    threadPrefixId: threadPrefixId,
    message: convertToPostFormat(req.body),
  };
  const body = new URLSearchParams(xfPostThreadParams);

  try {
    let data = await fetch(boardUrl, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'XF-Api-Key': xfKey,
        'XF-Api-User': xfUser,
      },
      body: body,
    });

    data = await data.json();

    if (data.errors) {
      let msg = data.errors[0].message;
      throw new Error(msg);
    }

    if (data.success) {
      res.status(200).json({ message: 'Submitted successfully' });
    } else {
      throw new Error('Something went wrong.');
    }
  } catch (e) {
    res.status(500).json({ name: e.name, msg: e.message });
  }
};

//for encoding body as form urlencoded
//https://stackoverflow.com/questions/35325370/how-do-i-post-a-x-www-form-urlencoded-request-using-fetch
