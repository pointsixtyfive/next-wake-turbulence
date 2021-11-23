export default async (req, res) => {
  const xfUser = process.env.XF_API_USER;
  const xfKey = process.env.XF_API_KEY;

  const reqData = req.body; //this data needs to come from the front end.
  console.log(req);
  // const message = { questionInfo, userMessage };
  let message = 'test';
  const xfPostThreadParams = { node_id: 2, title: 'Some Title', message: message };
  const body = new URLSearchParams(xfPostThreadParams);

  try {
    let data = await fetch('https://pointsixtyfive.com/dev/api/threads', {
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
    console.log(data);
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
