export const removeTimeZoneName = (date: string): string =>
  date.replace(/\[.*]$/, '');
