export type TimeFilterPreset =
  | 'DAY'
  | 'WEEK'
  | 'FORTNIGHT'
  | 'MONTH'
  | 'QUARTER'
  | 'HALF_YEAR'
  | 'YEAR';

export type TimeFilterValue = {
  from: string;
  to: string;
  preset: TimeFilterPreset;
};
