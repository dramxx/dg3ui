import {
  differenceInDays,
  endOfDay,
  Interval,
  isEqual,
  startOfDay,
  subDays,
} from 'date-fns';
import { MessageDescriptor, TimeFilterPreset } from '@dg3/types';
import { messages } from './messages';

export interface TimeFilterPresetItem {
  id: TimeFilterPreset;
  create: (date: Date | number) => Interval;
  is: (arg: Interval) => boolean;
  msg: MessageDescriptor;
  optionMsg: MessageDescriptor;
}

export const createDurationBasedPreset = (
  durationInDays: number,
  rest: Omit<TimeFilterPresetItem, 'create' | 'is'>
): TimeFilterPresetItem => ({
  create: (date) => ({
    start: startOfDay(subDays(date, durationInDays - 1)),
    end: endOfDay(date),
  }),
  is: ({ start, end }) =>
    isEqual(startOfDay(start), start) &&
    isEqual(endOfDay(end), end) &&
    differenceInDays(end, start) === durationInDays - 1,
  ...rest,
});

export const TimeFilterPresets: Record<
  TimeFilterPreset,
  TimeFilterPresetItem
> = {
  DAY: createDurationBasedPreset(1, {
    id: 'DAY',
    msg: messages.presetDay,
    optionMsg: messages.presetDayOption,
  }),
  WEEK: createDurationBasedPreset(7, {
    id: 'WEEK',
    msg: messages.presetWeek,
    optionMsg: messages.presetWeekOption,
  }),
  FORTNIGHT: createDurationBasedPreset(14, {
    id: 'FORTNIGHT',
    msg: messages.presetFortnight,
    optionMsg: messages.presetFortnightOption,
  }),
  MONTH: createDurationBasedPreset(30, {
    id: 'MONTH',
    msg: messages.presetMonth,
    optionMsg: messages.presetMonthOption,
  }),
  QUARTER: createDurationBasedPreset(90, {
    id: 'QUARTER',
    msg: messages.presetQuarter,
    optionMsg: messages.presetQuarterOption,
  }),
  HALF_YEAR: createDurationBasedPreset(180, {
    id: 'HALF_YEAR',
    msg: messages.presetHalfYear,
    optionMsg: messages.presetHalfYearOption,
  }),
  YEAR: createDurationBasedPreset(365, {
    id: 'YEAR',
    msg: messages.presetYear,
    optionMsg: messages.presetYearOption,
  }),
};
