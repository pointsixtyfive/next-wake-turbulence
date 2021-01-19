'use strict';

function generateQuestion(aircraftList) {
  const random = (min = 1, max = 100) => Math.floor(Math.random() * max + min);

  //Pull two random aircraft from the array
  const getAircraft = () => {
    const data = [];

    for (let i = 0; i < 2; i++) {
      data.push(aircraftList[random(0, aircraftList.length)]);
    }

    return data;
  };

  const [lead, trail] = getAircraft();

  //Set the departure positions for each aircraft
  //Randomly select departure position based on if the aircraft can accept an intersection
  function getDeparturePoint(arr) {
    return arr.map((aircraft) => {
      let num = random();

      if (aircraft.intersection === true && num > 30) {
        return 'Intersection';
      } else {
        return 'Full length';
      }
    });
  }

  const [leadDepPoint, trailDepPoint] = getDeparturePoint([lead, trail]);

  //Randomly assign departure from an intersecting runway or opposite direction. use -1 to disable crossing or odo.
  //need to work on this to allow for disabling either situation. for now just use defaults.
  function assignRwy(odoChance = 10, crossingChance = 30) {
    let num = random();

    if (odoChance > 0 && num >= 100 - odoChance) return 'opposite';
    if (crossingChance > 0 && num >= 65) return 'crossing';
    return '';
  }

  const questionData = { lead, trail };
  questionData.lead.departurePoint = leadDepPoint;
  questionData.trail.departurePoint = trailDepPoint;
  questionData.lead.runway = assignRwy();
  questionData.trail.runway = (() => (questionData.lead.runway !== '' ? '' : assignRwy()))();

  //Compare the characteristics to see if there is any wake turbulence requirement
  const leadWake = lead.weightScore;
  const trailWake = trail.weightScore;

  const isWake = (lead, trail) => {
    if (lead < 5 && lead === trail) {
      return false;
    }

    if (lead < trail) {
      return false;
    }

    return true;
  };

  const wake = isWake(leadWake, trailWake);

  const isWaivable = () => {
    if (!wake) {
      return false;
    }

    return leadWake >= 4 ? false : true;
  };

  //NOTE TO DELETE LATER. super not incorporated into check, anything behind it is +1 min. a

  function calculateWake() {
    const answer = {
      wakeTime: undefined,
      waiveable: isWaivable(),
    };

    if (
      (leadWake === 5 && trailWake <= 5 && leadDepPoint === trailDepPoint) ||
      (leadWake === 4 && trailWake <= 2 && leadDepPoint === trailDepPoint)
    ) {
      answer.wakeTime = 2;
      return answer;
    } else if (leadWake > trailWake && leadDepPoint === 'Full length' && trailDepPoint === 'Intersection') {
      answer.wakeTime = 3;
      return answer;
    } else {
      console.error('something is wrong with the wake turbulence comparison');
    }

    return answer;
  }

  const getAnswer = () => {
    if (!wake) {
      return { wakeTime: 'None', waiveable: 'N/A' };
    } else {
      return calculateWake();
    }
  };

  const answer = getAnswer();
  questionData.answer = answer;

  console.log(questionData);
  return questionData;
}

export default generateQuestion;
