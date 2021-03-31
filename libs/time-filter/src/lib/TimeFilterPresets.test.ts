import {
  createDurationBasedPreset,
  TimeFilterPresetItem,
  TimeFilterPresets,
} from './TimeFilterPresets';
import { differenceInDays, endOfDay, startOfDay, subDays } from 'date-fns';

const date = new Date('2020-05-19T13:39:25');

describe('Duration based presets', () => {
  const duration = 5;
  const preset = createDurationBasedPreset(
    duration,
    {} as TimeFilterPresetItem
  );
  describe('created intervals', () => {
    const interval = preset.create(date);
    it('start at the start of day', () => {
      expect(interval.start).toEqual(startOfDay(interval.start));
    });
    it('end at the end of day', () => {
      expect(interval.end).toEqual(endOfDay(interval.end));
    });
    it('end on input date', () => {
      expect(interval.end).toEqual(endOfDay(date));
    });
    it('have the correct duration', () => {
      expect(differenceInDays(interval.end, interval.start)).toBe(duration - 1);
    });
  });
  describe('preset tests', () => {
    it('rejects intervals not starting on start of day', () => {
      const interval = {
        start: subDays(date, duration - 1),
        end: endOfDay(date),
      };
      console.log(differenceInDays(interval.end, interval.start));
      expect(preset.is(interval)).toBe(false);
    });
    it('rejects intervals not ending on end of day', () => {
      const interval = {
        start: startOfDay(subDays(date, duration - 1)),
        end: date,
      };
      expect(preset.is(interval)).toBe(false);
    });
    it('rejects shorter intervals', () => {
      const interval = {
        start: startOfDay(subDays(date, duration - 2)),
        end: endOfDay(date),
      };
      expect(preset.is(interval)).toBe(false);
    });
    it('rejects longer intervals', () => {
      const interval = {
        start: startOfDay(subDays(date, duration + 1)),
        end: endOfDay(date),
      };
      expect(preset.is(interval)).toBe(false);
    });
    it('accepts correct intervals', () => {
      const interval = {
        start: startOfDay(subDays(date, duration - 1)),
        end: endOfDay(date),
      };
      expect(preset.is(interval)).toBe(true);
    });
  });
});

describe('Time Filter Presets', () => {
  describe('intervals created by "create" are accepted by "is"', () => {
    Object.values(TimeFilterPresets).forEach((preset) => {
      it(`for "${preset.id}" preset`, () => {
        const interval = preset.create(date);
        expect(preset.is(interval)).toBe(true);
      });
    });
  });
});
