import * as cut from './checkValueForIsoDate';

describe('checkValueForIsoDate', () => {
  it('empty value', () => {
    expect(cut.checkValueForIsoDate('')).toBeFalsy();
  });
  it('correct value', () => {
    expect(cut.checkValueForIsoDate('2020-03-03T12:12:12Z')).toBeTruthy();
  });
  it('invalid date value', () => {
    expect(cut.checkValueForIsoDate('2020-13-13T32:12:12Z')).toBeFalsy();
  });
  it('simple number value', () => {
    expect(cut.checkValueForIsoDate('1234')).toBeFalsy();
  });
  it('correct value without Z', () => {
    expect(cut.checkValueForIsoDate('2020-03-03T12:12:12')).toBeTruthy();
  });
  it('correct value with miliseconds', () => {
    expect(cut.checkValueForIsoDate('2020-03-03T12:12:12.123Z')).toBeTruthy();
  });
  it('number value', () => {
    expect(cut.checkValueForIsoDate('12.233244')).toBeFalsy();
  });
  it('string value', () => {
    expect(cut.checkValueForIsoDate('rtgaeddawZ')).toBeFalsy();
  });
  it('number date value', () => {
    expect(cut.checkValueForIsoDate(new Date().getTime())).toBeFalsy();
  });
  it('number date value #2', () => {
    expect(cut.checkValueForIsoDate(1606164313469)).toBeFalsy();
  });
});
