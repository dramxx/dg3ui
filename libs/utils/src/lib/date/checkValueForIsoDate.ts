import { isValid, parseISO } from 'date-fns';

import { isNumber } from '../math/isNumber';

export const checkValueForIsoDate = (value: string | number) => {
  if (typeof value === 'number' || isNumber(value)) {
    return false;
  }

  return isValid(parseISO(value));
};
