import { isNumber } from './isNumber';

describe('isNumber', () => {
  it('zero', () => {
    expect(isNumber(0)).toBeTruthy();
  });

  it('number', () => {
    expect(isNumber(12)).toBeTruthy();
  });

  it('float', () => {
    expect(isNumber(25.456234)).toBeTruthy();
  });

  it('negative value', () => {
    expect(isNumber(-2.54525)).toBeTruthy();
  });

  it('string number', () => {
    expect(isNumber('12')).toBeTruthy();
  });

  it('string number #2', () => {
    expect(isNumber('  .123')).toBeTruthy();
  });

  it('string negative float', () => {
    expect(isNumber('-12.5')).toBeTruthy();
  });

  it('NaN', () => {
    expect(isNumber(NaN)).toBeFalsy();
  });

  it('string', () => {
    expect(isNumber('gfgdf')).toBeFalsy();
  });

  it('string #2', () => {
    expect(isNumber('134fds')).toBeFalsy();
  });

  it('null', () => {
    expect(isNumber(null)).toBeFalsy();
  });

  it('undefined', () => {
    expect(isNumber(undefined)).toBeFalsy();
  });

  it('object', () => {
    expect(isNumber({})).toBeFalsy();
  });

  it('array', () => {
    expect(isNumber([])).toBeFalsy();
  });
});
