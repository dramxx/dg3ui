import {
  addMilliseconds,
  differenceInMilliseconds,
  Interval,
  min,
  subMilliseconds,
} from 'date-fns';

export const shiftIntervalBack = (interval: Interval): Interval => {
  const difference = differenceInMilliseconds(interval.end, interval.start);
  const end = subMilliseconds(interval.start, 1);
  const start = subMilliseconds(end, difference);
  return { start, end };
};

export const shiftIntervalForward = (
  interval: Interval,
  stop: Date
): Interval => {
  const difference = differenceInMilliseconds(interval.end, interval.start);
  const maxStart = subMilliseconds(stop, difference);
  const idealStart = addMilliseconds(interval.end, 1);
  const start = min([maxStart, idealStart]);
  const end = addMilliseconds(start, difference);
  return { start, end };
};
