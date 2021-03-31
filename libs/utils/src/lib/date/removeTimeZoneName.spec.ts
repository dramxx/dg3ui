import { removeTimeZoneName } from './removeTimeZoneName';

describe('remove time zone name helper', () => {
  it('removes time zone name from ISO-like format', () => {
    expect(
      removeTimeZoneName('2021-02-02T09:02:48+01:00[Europe/Prague]')
    ).toEqual('2021-02-02T09:02:48+01:00');
  });
  it('leaves ISO format as it is', () => {
    expect(removeTimeZoneName('2021-02-02T09:03:25+01:00')).toEqual(
      '2021-02-02T09:03:25+01:00'
    );
  });
  it('leaves UTC time as it is', () => {
    expect(removeTimeZoneName('2021-02-02T08:03:54Z')).toEqual(
      '2021-02-02T08:03:54Z'
    );
  });
});
