import { isRaceValid } from './race-validator';
import { charCompareFn } from './char-compare';

describe('race-validator', () => {
  const testArr = [...'Hello World'].sort(charCompareFn);
  it('isRaceValid', () => {
    console.log(testArr);
    expect(isRaceValid(testArr, charCompareFn)).toBeTruthy();
  });
});
