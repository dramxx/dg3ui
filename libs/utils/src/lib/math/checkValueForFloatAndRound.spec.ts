import { checkValueForFloatAndRound } from './checkValueForFloatAndRound';

describe('checkValueForFloatAndRound', () => {
  it('zero', () => {
    expect(checkValueForFloatAndRound(0)).toEqual(0);
  });

  it('undefined', () => {
    expect(checkValueForFloatAndRound(undefined)).toEqual(undefined);
  });

  it('null', () => {
    expect(checkValueForFloatAndRound(null)).toEqual(null);
  });

  it('string', () => {
    expect(checkValueForFloatAndRound('abc')).toEqual('abc');
  });

  it('integer', () => {
    expect(checkValueForFloatAndRound(25456234)).toEqual(25456234);
  });

  it('negative integer', () => {
    expect(checkValueForFloatAndRound(-25456234)).toEqual(-25456234);
  });

  it('float', () => {
    expect(checkValueForFloatAndRound(2.54525)).toEqual(2.55);
  });

  it('float with decimal digits param specified', () => {
    expect(checkValueForFloatAndRound(2.54528, 4)).toEqual(2.5453);
  });

  it('negative float', () => {
    expect(checkValueForFloatAndRound(-2.54525)).toEqual(-2.55);
  });
});
