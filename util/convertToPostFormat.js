export default function (data) {
  /* 
  Substitutes a blank template object if the keys are not found in the argument. This can happen if a user 
  submits a report prior to checking an answer (where the data is initialized).
  */
  if (Object.keys(data.questionData).length == 0) {
    data = {
      questionData: {
        lead: {
          name: 'null',
          category: 0,
          weightClass: 'null',
          weightScore: 0,
          intersection: true,
          departurePoint: 'null',
          runway: 'null',
          parallel: false,
        },
        trail: {
          name: 'null',
          category: 0,
          weightClass: 'null',
          weightScore: 0,
          intersection: false,
          departurePoint: 'null',
          runway: 'null',
          parallel: false,
        },
        answer: { wakeTime: 'null', waiveable: 'null' },
      },
      userMessage: data.userMessage,
    };
  }

  const {
    questionData: { lead, trail, answer },
  } = data;

  let template = `
    [TABLE]
      [TR]
        [TH][/TH]
        [TH]Name[/TH]
        [TH]Cat[/TH]
        [TH]WClass[/TH]
        [TH]WScore[/TH]
        [TH]Intersection[/TH]
        [TH]Dep Point[/TH]
        [TH]Runway[/TH]
        [TH]Parallel[/TH]
      [/TR]
      [TR]
        [TD]Lead[/TD]
        [TD]${lead.name}[/TD]
        [TD]${lead.category}[/TD]
        [TD]${lead.weightClass}[/TD]
        [TD]${lead.weightScore}[/TD]
        [TD]${lead.intersection}[/TD]
        [TD]${lead.departurePoint}[/TD]
        [TD]${lead.runway}[/TD]
        [TD]${lead.parallel}[/TD]
      [/TR]
      [TR]
        [TD]Trail[/TD]
        [TD]${trail.name}[/TD]
        [TD]${trail.category}[/TD]
        [TD]${trail.weightClass}[/TD]
        [TD]${trail.weightScore}[/TD]
        [TD]${trail.intersection}[/TD]
        [TD]${trail.departurePoint}[/TD]
        [TD]${trail.runway}[/TD]
        [TD]${trail.parallel}[/TD]
      [/TR]
    [/TABLE]
    [TABLE]
      [TR]
        [TH]Answer[/TH]
      [/TR]
      [TR]
        [TD]Wake Time[/TD]
        [TD]${answer.waiveable}[/TD]
      [/TR]
      [TR]
        [TD]Waiveable[/TD]
        [TD]${answer.waiveable}[/TD]
      [/TR]
    [/TABLE]
    [TABLE]
      [TR]
        [TH]User Message[/TH]
      [/TR]
      [TR]
        [TD]${data.userMessage}[/TD]
      [/TR]
    [/TABLE]
    `;

  return template.trim();
}
