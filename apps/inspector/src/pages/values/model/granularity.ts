import { ECalendarTime } from '@api';

const Milisecond = 1;
const Second = 1000 * Milisecond;
const Minute = 60 * Second;
const Hour = 60 * Minute;
const Day = 24 * Hour;
const Week = 7 * Day;
const Month = 30 * Day;
const Year = 365 * Day;

const TimeMap: Record<ECalendarTime, number> = {
  [ECalendarTime.MINUTE]: Minute,
  [ECalendarTime.HOUR]: Hour,
  [ECalendarTime.DAY]: Day,
  [ECalendarTime.WEEK]: Week,
  [ECalendarTime.MONTH]: Month,
  [ECalendarTime.YEAR]: Year,
};

const ChartPointsMax = 1000;

export function findGranularity(timespan: number) {
  const calendarTimes = Object.keys(TimeMap) as ECalendarTime[];
  return calendarTimes.find((time) => {
    return timespan / TimeMap[time] < ChartPointsMax;
  });
}
