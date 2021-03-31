import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  submit: {
    id: 'timeFilter.submit',
    defaultMessage: 'submit',
  },
  customPreset: {
    id: 'timeFilter.presets.custom',
    defaultMessage: 'custom',
  },
  customPresetOption: {
    id: 'timeFilter.presets.custom.option',
    defaultMessage: 'custom range',
  },
  presetDay: { id: 'timeFilter.presets.day', defaultMessage: '24 hours' },
  presetDayOption: {
    id: 'timeFilter.preset.day.option',
    defaultMessage: 'last 24 hours',
  },
  presetWeek: { id: 'timeFilter.presets.week', defaultMessage: '7 days' },
  presetWeekOption: {
    id: 'timeFilter.preset.week.option',
    defaultMessage: 'last 7 days',
  },
  presetFortnight: {
    id: 'timeFilter.presets.fortnight',
    defaultMessage: '14 days',
  },
  presetFortnightOption: {
    id: 'timeFilter.preset.fortnight.option',
    defaultMessage: 'last 14 days',
  },
  presetMonth: { id: 'timeFilter.presets.month', defaultMessage: '30 days' },
  presetMonthOption: {
    id: 'timeFilter.preset.month.option',
    defaultMessage: 'last 30 days',
  },
  presetQuarter: {
    id: 'timeFilter.presets.quarter',
    defaultMessage: '90 days',
  },
  presetQuarterOption: {
    id: 'timeFilter.preset.quarter.option',
    defaultMessage: 'last 90 days',
  },
  presetHalfYear: {
    id: 'timeFilter.presets.halfYear',
    defaultMessage: '180 days',
  },
  presetHalfYearOption: {
    id: 'timeFilter.preset.halfYear.option',
    defaultMessage: 'last 180 days',
  },
  presetYear: { id: 'timeFilter.presets.year', defaultMessage: '365 days' },
  presetYearOption: {
    id: 'timeFilter.preset.year.option',
    defaultMessage: 'last 365 days',
  },
});
