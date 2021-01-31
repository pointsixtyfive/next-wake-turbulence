function heavyWakeCheck(data) {
  const { odo, crossing, leadWake, trailWake, leadDepPoint, trailDepPoint, answer } = data;

  //add one minute for supers
  function isSuper() {
    if (leadWake == 6) answer.wakeTime++;
    console.log(leadWake == 6);
    return leadWake == 6; //for debugging only
  }

  if (!odo && !crossing) {
    //standard intersection
    if (
      (leadWake === 5 && trailWake <= 5 && leadDepPoint === trailDepPoint) ||
      (leadWake === 4 && trailWake <= 2 && leadDepPoint === trailDepPoint) ||
      (leadWake === 6 && trailWake >= 5)
    ) {
      answer.wakeTime = 2;

      isSuper();

      return answer;
    }
  } else if (crossing) {
    //crossing runways - check for crossing first to skip odo check, since an "odo" operation won't be on the same runway and therefore not really odo.
    if (leadWake >= 5 || (leadWake == 4 && trailWake <= 2)) {
      answer.wakeTime = 2;

      isSuper();

      return answer;
    }
  } else {
    //opposite direction
    if ((odo && leadWake >= 5) || (leadWake == 4 && trailWake <= 2)) {
      answer.wakeTime = 3;
    }

    isSuper();
  }

  return answer;
}

export default heavyWakeCheck;

//Notes:
//Anthing behind a heavy on a crossing rwy is 2 min, behind super is 3
//Opposite direction is 3 for heavy and 4 for supers
//Smalls behind B757 is 3 for ODO, 2 for crossing
