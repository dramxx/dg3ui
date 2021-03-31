import { roundFloat } from './roundFloat';

describe('roundFloat', () => {
  it('zero', () => {
    expect(roundFloat(0, 2)).toEqual(0);
  });

  it('2 decimal digits', () => {
    expect(roundFloat(25.456234, 2)).toEqual(25.46);
  });

  it('negative value', () => {
    expect(roundFloat(-2.54525, 1)).toEqual(-2.5);
  });
});
