import { DateType } from './Date';

describe('Date runtypes helper', () => {
  const date = '2020-07-09T13:31:53.000Z';
  it('matches date', () => {
    DateType.check(new Date(date));
  });
  it('does not match date string', () => {
    expect(() => DateType.check(date)).toThrow();
  });
  it('does not match timestamp', () => {
    expect(() => DateType.check(1594294415000)).toThrow();
  });
  it('does not match invalid date', () => {
    expect(() => DateType.check(new Date(''))).toThrow();
  });
});
