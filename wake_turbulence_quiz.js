'use strict';

// ****Aircraft array****
const AIRCRAFT = [
  { name: 'A300', category: 3, weightClass: 'Heavy', weightScore: 5, intersection: false },
  { name: 'A320', category: 3, weightClass: 'Large', weightScore: 3, intersection: false },
  { name: 'A340', category: 3, weightClass: 'Heavy', weightScore: 5, intersection: false },
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

//Get a question (user initiated)
function getQuestion() {
  getAircraft();
  getDeparturePoint();
}

//Pull two random aircraft from the array
let aircraftInUse;

function getAircraft() {
  let lead = AIRCRAFT[Math.floor(Math.random() * AIRCRAFT.length)];
  let trail = AIRCRAFT[Math.floor(Math.random() * AIRCRAFT.length)];
  aircraftInUse = [lead, trail];

  return aircraftInUse;
}
getAircraft(); //line used for debugging

//Set the departure positions for each aircraft
//Randomly select departure position based on if the aircraft can accept an intersection
let departurePoint = [];
function getDeparturePoint() {
  aircraftInUse.map((index) => {
    let random = Math.floor(Math.random() * 3);
    if (index.intersection === true && random > 0) {
      return departurePoint.push('Intersection');
    } else {
      return departurePoint.push('Full length');
    }
  });
}
getDeparturePoint(); //Line used for debugging

//Randomly assign departure from an intersecting runway
function assignIntersectingRwy() {
  //stuff
}

//Compare the characteristics to see if there is any wake turbulence requirement
let leadWake = aircraftInUse[0].weightScore;
let trailWake = aircraftInUse[1].weightScore;
let leadDepPoint = departurePoint[0];
let trailDepPoint = departurePoint[1];

let noWake = leadWake < trailWake ? true : false; // need to redo this to account for small to small etc.
let wakeTime;
let waiveable = leadWake >= 5 ? false : true;

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

if (noWake === true) {
  wakeTime = 'None';
  waiveable = 'N/A';
} else {
  calculateWake();
}

console.log(aircraftInUse, departurePoint, noWake, wakeTime, waiveable);
//Return information for insertion into HTML

//Get user input

//Check user answers

//Return feedback
