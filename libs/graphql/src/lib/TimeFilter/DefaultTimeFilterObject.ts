import { endOfDay, startOfDay, subDays } from 'date-fns';

import { TimeFilterValue } from '@dg3/types';

export const defaultTimeFilterObject: TimeFilterValue = {
  from: startOfDay(subDays(Date.now(), 14)).toISOString(),
  to: endOfDay(new Date()).toISOString(),
  preset: 'FORTNIGHT',
};
