import { addHours, addMinutes, differenceInHours, subMinutes } from 'date-fns';
import { format } from 'date-fns-tz';

/* this function generates result dates always in UTC */
export const eachHourOfIntervalInUtc = (from: string, to: string) => {
  const diff = differenceInHours(Date.parse(to), Date.parse(from));

  let dates = [];

  for (let i = 0; i <= diff; i++) {
    const newDate = addHours(new Date(from), i);

    // calculate timezone offset
    const offset = newDate.getTimezoneOffset();

    const utcDate = addMinutes(newDate, offset);

    dates.push(
      format(utcDate, "yyyy-MM-dd'T'HH:mm:ssxxxxx", {
        timeZone: 'UTC',
      })
    );
  }

  return dates;
};
