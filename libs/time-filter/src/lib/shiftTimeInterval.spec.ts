import { shiftIntervalBack, shiftIntervalForward } from './shiftTimeInterval';
import { differenceInMilliseconds } from 'date-fns';

describe('shift time interval helpers', () => {
  const interval = {
    start: new Date('2020-06-10T00:00:00.000Z'),
    end: new Date('2020-06-18T23:59:59.999Z'),
  };
  const expectSameLength = (i1: Interval, i2: Interval) => {
    expect(differenceInMilliseconds(i1.end, i1.start)).toEqual(
      differenceInMilliseconds(i2.end, i2.start)
    );
  };
  describe('shift interval backward', () => {
    it('resulting interval ends just before the original starts', () => {
      expect(shiftIntervalBack(interval).end).toEqual(
        new Date('2020-06-09T23:59:59.999Z')
      );
    });
    it('both interval have the same length', () => {
      expectSameLength(shiftIntervalBack(interval), interval);
    });
  });
  describe('shift interval forward', () => {
    describe('when it does not hit stop', () => {
      const futureDate = new Date('2020-10-20');
      it('starts just after the original ends', () => {
        expect(shiftIntervalForward(interval, futureDate).start).toEqual(
          new Date('2020-06-19T00:00:00.000Z')
        );
      });
      it('both interval have the same length', () => {
        expectSameLength(shiftIntervalForward(interval, futureDate), interval);
      });
    });
    describe('when it hits stop', () => {
      const stop = new Date('2020-06-20T23:59:59.999Z');
      it('ends at stop', () => {
        expect(shiftIntervalForward(interval, stop).end).toEqual(stop);
      });
      it('both intervals have the same length', () => {
        expectSameLength(shiftIntervalForward(interval, stop), interval);
      });
    });
  });
});
