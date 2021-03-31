import { eachHourOfIntervalInUtc } from './eachHourOfIntervalInUtc';

describe('eachHourOfIntervalInUtc', () => {
  it('empty dates', () => {
    expect(eachHourOfIntervalInUtc('', '')).toEqual([]);
  });
  it('valid dates', () => {
    expect(
      eachHourOfIntervalInUtc(
        '2019-02-01T00:00:00+00:00',
        '2019-02-01T03:00:00+00:00'
      )
    ).toEqual([
      '2019-02-01T00:00:00+00:00',
      '2019-02-01T01:00:00+00:00',
      '2019-02-01T02:00:00+00:00',
      '2019-02-01T03:00:00+00:00',
    ]);
  });
  it('dates over midnight', () => {
    expect(
      eachHourOfIntervalInUtc(
        '2019-02-01T22:00:00+00:00',
        '2019-02-02T02:00:00+00:00'
      )
    ).toEqual([
      '2019-02-01T22:00:00+00:00',
      '2019-02-01T23:00:00+00:00',
      '2019-02-02T00:00:00+00:00',
      '2019-02-02T01:00:00+00:00',
      '2019-02-02T02:00:00+00:00',
    ]);
  });
  it('different timezone', () => {
    expect(
      eachHourOfIntervalInUtc(
        '2019-02-01T22:00:00+02:00',
        '2019-02-02T02:00:00+02:00'
      )
    ).toEqual([
      '2019-02-01T20:00:00+00:00',
      '2019-02-01T21:00:00+00:00',
      '2019-02-01T22:00:00+00:00',
      '2019-02-01T23:00:00+00:00',
      '2019-02-02T00:00:00+00:00',
    ]);
  });
  it('timezone with minus shift', () => {
    expect(
      eachHourOfIntervalInUtc(
        '2019-02-01T22:00:00-02:00',
        '2019-02-02T02:00:00-02:00'
      )
    ).toEqual([
      '2019-02-02T00:00:00+00:00',
      '2019-02-02T01:00:00+00:00',
      '2019-02-02T02:00:00+00:00',
      '2019-02-02T03:00:00+00:00',
      '2019-02-02T04:00:00+00:00',
    ]);
  });
});
