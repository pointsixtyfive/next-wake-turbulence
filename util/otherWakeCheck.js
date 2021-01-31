function otherWakeCheck(data) {
  const { odo, crossing, leadWake, trailWake, leadDepPoint, trailDepPoint, answer } = data;

  if (crossing) {
    Object.assign(answer, { wakeTime: 'None', waiveable: 'N/A' });
    return 1;
  }

  if (leadWake > trailWake) {
    //Opposite direction, or Large full length in front of smaller at intersection
    if ((leadDepPoint === 'full length' && trailDepPoint === 'intersection') || odo) {
      answer.wakeTime = 3;
    } else if (leadDepPoint === 'intersection' || leadDepPoint === trailDepPoint) {
      //Large from intersection in front of smaller at full length, or both at same point
      Object.assign(answer, { wakeTime: 'None', waiveable: 'N/A' });
    }

    return answer;
  }
}

export default otherWakeCheck;

//Notes:
//Intersections Smalls behind larges/small+ at full length 3 mins
//Crossing rwy, only heavies have a wt requirement
//Opposite direction is same as intersections
