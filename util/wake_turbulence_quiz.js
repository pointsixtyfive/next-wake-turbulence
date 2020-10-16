'use strict';

const AIRCRAFT = [
  { name: 'A300', category: 3, weightClass: 'Heavy', weightScore: 5, intersection: false },
  { name: 'A320', category: 3, weightClass: 'Large', weightScore: 3, intersection: false },
  { name: 'A340', category: 3, weightClass: 'Heavy', weightScore: 5, intersection: false },
  { name: 'A400', category: 3, weightClass: 'Super', weightScore: 6, intersection: false },
  { name: 'AC68', category: 1, weightClass: 'Small', weightScore: 1, intersection: true },
  { name: 'B727', category: 3, weightClass: 'Large', weightScore: 3, intersection: false },
  { name: 'B737', category: 3, weightClass: 'Large', weightScore: 3, intersection: false },
  { name: 'B747', category: 3, weightClass: 'Heavy', weightScore: 5, intersection: false },
  { name: 'B757', category: 3, weightClass: 'B757', weightScore: 4, intersection: false },
  { name: 'B767', category: 3, weightClass: 'Heavy', weightScore: 5, intersection: false },
  { name: 'B777', category: 3, weightClass: 'Heavy', weightScore: 5, intersection: false },
  { name: 'BE20', category: 3, weightClass: 'Small+', weightScore: 2, intersection: true },
  { name: 'BE36', category: 1, weightClass: 'Small', weightScore: 1, intersection: true },
  { name: 'BE40', category: 3, weightClass: 'Small+', weightScore: 2, intersection: true },
  { name: 'BE58', category: 2, weightClass: 'Small', weightScore: 1, intersection: true },
  { name: 'C130', category: 3, weightClass: 'Large', weightScore: 3, intersection: true },
  { name: 'C172', category: 1, weightClass: 'Small', weightScore: 1, intersection: true },
  { name: 'C208', category: 1, weightClass: 'Small', weightScore: 1, intersection: true },
  { name: 'C310', category: 2, weightClass: 'Small', weightScore: 1, intersection: true },
  { name: 'C421', category: 2, weightClass: 'Small', weightScore: 1, intersection: true },
  { name: 'C550', category: 3, weightClass: 'Small+', weightScore: 2, intersection: true },
  { name: 'CL60', category: 3, weightClass: 'Large', weightScore: 3, intersection: false },
  { name: 'CRJ9', category: 3, weightClass: 'Large', weightScore: 3, intersection: false },
  { name: 'DH8A', category: 3, weightClass: 'Large', weightScore: 3, intersection: true },
  { name: 'F15', category: 3, weightClass: 'Large', weightScore: 3, intersection: false },
  { name: 'F16', category: 3, weightClass: 'Large', weightScore: 3, intersection: false },
  { name: 'F18', category: 3, weightClass: 'Large', weightScore: 3, intersection: false },
  { name: 'F22', category: 3, weightClass: 'Large', weightScore: 3, intersection: false },
  { name: 'FA20', category: 3, weightClass: 'Large', weightScore: 3, intersection: true },
  { name: 'GLF3', category: 3, weightClass: 'Large', weightScore: 3, intersection: true },
  { name: 'KC10', category: 3, weightClass: 'Heavy', weightScore: 5, intersection: false },
  { name: 'LJ35', category: 3, weightClass: 'Small+', weightScore: 2, intersection: true },
  { name: 'M20P', category: 1, weightClass: 'Small', weightScore: 1, intersection: true },
  { name: 'MD11', category: 3, weightClass: 'Heavy', weightScore: 5, intersection: false },
  { name: 'MD80', category: 3, weightClass: 'Large', weightScore: 3, intersection: false },
  { name: 'P28A', category: 1, weightClass: 'Small', weightScore: 1, intersection: true },
  { name: 'PA31', category: 2, weightClass: 'Small', weightScore: 1, intersection: true },
  { name: 'PA34', category: 2, weightClass: 'Small', weightScore: 1, intersection: true },
  { name: 'PA46', category: 1, weightClass: 'Small', weightScore: 1, intersection: true },
  { name: 'PAY3', category: 2, weightClass: 'Small', weightScore: 1, intersection: true },
  { name: 'PC12', category: 1, weightClass: 'Small', weightScore: 1, intersection: true },
  { name: 'SR22', category: 1, weightClass: 'Small', weightScore: 1, intersection: true },
];

const random = (min = 1, max = 100) => Math.floor(Math.random() * max + min);

//Pull two random aircraft from the array
const getAircraft = () => {
  const data = [];

  for (let i = 0; i < 2; i++) {
    data.push(AIRCRAFT[random(0, AIRCRAFT.length)]);
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
  if (
    (leadWake === 5 && trailWake <= 5 && leadDepPoint === trailDepPoint) ||
    (leadWake === 4 && trailWake <= 2 && leadDepPoint === trailDepPoint)
  ) {
    return (wakeTime = 2);
  } else if (leadWake > trailWake && leadDepPoint === 'Full length' && trailDepPoint === 'Intersection') {
    return (wakeTime = 3);
  } else {
    console.error('something is wrong with the wake turbulence comparison');
  }
}

const getAnswer = () => {
  if (!wake) {
    return { wakeTime: 'None', waiveable: 'N/A' };
  } else {
    calculateWake();
  }
};

const answer = getAnswer();
questionData.answer = answer;

console.log(questionData);
