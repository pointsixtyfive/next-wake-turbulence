'use strict';

import heavyWakeCheck from './heavyWake';
import otherWakeCheck from './otherWakeCheck';

//Default options. Numerical value 0 - 100 to represent the frequency an aircraft is assigned to one of the cases. 0 turns off the option
export const defaultOptions = {
  parallel: 0,
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
    let num = random();
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

  //Compare the characteristics to see if there is any wake turbulence requirement
  const leadWake = lead.weightScore;
  const trailWake = trail.weightScore;

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

  const answer = getAnswer();
  questionData.answer = answer;

  if (questionData.answer.wakeTime === undefined) {
    console.error('Something is wrong with the wake turbulence comparison: ', questionData);
    throw new Error(
      'Wake Time is undefined. \nThere was an error calculating the wake turbulence. Please ignore this question and report the error with the a/c types and positions in the support forum.'
    );
  }

  return questionData;
}

export default generateQuestion;
