'use strict';

import heavyWakeCheck from './heavyWake';
import otherWakeCheck from './otherWakeCheck';

//Default options. Numerical value 0 - 100 to represent the frequency an aircraft is assigned to one of the cases. 0 turns off the option. These aren't currently used, and must be set in the index page.
export const defaultOptions = {
  parallel: 5,
  opposite: 10,
  crossing: 15,
  intersection: 35,
};

function generateQuestion(aircraftList, options) {
  function random(min = 1, max = aircraftList.length) {
    return Math.floor(Math.random() * max + min);
  }

  //Pull two random aircraft from the array
  function getAircraft() {
    const data = [];

    for (let i = 0; i < 2; i++) {
      data.push(aircraftList[random(0, aircraftList.length)]);
    }

    return data;
  }

  const [lead, trail] = getAircraft();

  //Set the departure positions for each aircraft
  //Randomly select departure position based on if the aircraft can accept an intersection
  function getDeparturePoint(arr, intersectionChance = options.intersection) {
    return arr.map((aircraft) => {
      let num = random();

      return aircraft.intersection === true && intersectionChance > 0 && num <= options.intersection
        ? 'intersection'
        : 'full length';
    });
  }

  const [leadDepPoint, trailDepPoint] = getDeparturePoint([lead, trail]);

  //Randomly assign departure from an intersecting runway or opposite direction. use 0 to disable crossing or odo.
  function assignRwy(odoChance = options.opposite, crossingChance = options.crossing) {
    let num = random(1, 100);

    if (odoChance > 50) odoChance = 50;
    if (crossingChance > 50) crossingChance = 50;

    if (odoChance > 0 && num <= odoChance) return 'opposite';
    if (crossingChance > 0 && num >= 100 - crossingChance) return 'crossing';
    return false;
  }

  const questionData = { lead, trail };
  questionData.lead.departurePoint = leadDepPoint;
  questionData.trail.departurePoint = trailDepPoint;
  questionData.lead.runway = assignRwy();
  questionData.trail.runway = (() => (questionData.lead.runway == false ? assignRwy() : ''))(); //if the lead aircraft has a special runway assignment, the trail aircraft cannot

  //If parallel runways are an option, check to see if either a/c can be assigned to the parallel, and if so give chance to randomly assign them. A/c on crossing rwy cannot use the parallel
  questionData.lead.parallel = false;
  questionData.trail.parallel = false;

  if (options.parallel > 0) {
    questionData.lead.parallel = questionData.lead.runway == 'crossing' ? false : assignParallel();

    if (questionData.lead.parallel === false) {
      questionData.trail.parallel = questionData.trail.runway == 'crossing' ? false : assignParallel();
    }
  }

  function assignParallel(parallelChance = options.parallel) {
    let num = random(1, 100);
    if (parallelChance > 50) parallelChance = 50;

    return num <= parallelChance ? true : false;
  }

  //Compare the characteristics to see if there is any wake turbulence requirement
  const leadWake = lead.weightScore;
  const trailWake = trail.weightScore;

  //Basic check to find cases with wt req. Only compares the weight classes, does not check for situations where dep point alters the req.
  function isWake(lead, trail) {
    if (lead < 5 && lead === trail) {
      return false;
    }

    if (lead < trail) {
      return false;
    }

    return true;
  }

  const wake = isWake(leadWake, trailWake);

  function isWaivable() {
    if (!wake) {
      return false;
    }

    return leadWake >= 4 ? false : true;
  }

  function calculateWake() {
    const answer = {
      wakeTime: undefined,
      waiveable: isWaivable(),
    };

    const odo = lead.runway === 'opposite' || trail.runway === 'opposite';
    const crossing = lead.runway === 'crossing' || trail.runway === 'crossing';
    const parallel = lead.parallel || trail.parallel;
    //If using parallel as 2500'+ ONLY and flight path is not an issue, there is never any WT. Right now, that is how this is being utilized, and the answer is only valid in this use case.
    if (parallel) return { wakeTime: 'None', waiveable: 'N/A' };

    if (leadWake >= 4 || trailWake >= 4) {
      heavyWakeCheck({ odo, crossing, leadWake, trailWake, leadDepPoint, trailDepPoint, answer });
    }

    if (!answer.wakeTime) {
      otherWakeCheck({ odo, crossing, leadWake, trailWake, leadDepPoint, trailDepPoint, answer });
    }

    return answer;
  }

  function getAnswer() {
    if (!wake) {
      return { wakeTime: 'None', waiveable: 'N/A' };
    } else {
      return calculateWake();
    }
  }

  try {
    const answer = getAnswer();
    questionData.answer = answer;

    if (questionData.answer.wakeTime === undefined) {
      console.error('Something is wrong with the wake turbulence comparison: ', questionData);
      throw new Error(
        `There was an error calculating the wake turbulence. If able, report the error with the a/c types and positions in the support forum.
        ${questionData.lead.name} @ ${questionData.lead.departurePoint} --- ${questionData.trail.name} @ ${questionData.trail.departurePoint}`
      );
    }

    return questionData;
  } catch (error) {
    alert(error);
    setTimeout(() => {
      generateQuestion();
    }, 3000);
  }
}

export default generateQuestion;
