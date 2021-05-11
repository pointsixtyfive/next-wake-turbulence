import { isSuper } from './heavyWake';
//  {
//     odo: false,
//     crossing: false,
//     leadWake: 5,
//     trailWake: 3,
//     leadDepPoint: 'full length',
//     trailDepPoint: 'intersection',
//     answer: {
//       wakeTime: 3,
//       waiveable: false,
//     }

test('should identify a super and add one minute to wake time', () => {
  const { leadWake, answer } = {
    leadWake: 5,
    answer: {
      wakeTime: 3,
      waiveable: false,
    },
  };
  expect(isSuper(leadWake, answer)).toBe(false);
  expect(answer.wakeTime).toBe(3);

  const { leadWake2, answer2 } = { leadWake2: 6, answer2: { wakeTime: 3, waiveable: false } };
  expect(isSuper(leadWake2, answer2)).toBe(true);
  expect(answer2.wakeTime).toBe(4);
});

test.todo('should call appropriate function to check for wake (heavyWakeCheck, otherWakeCheck)');
