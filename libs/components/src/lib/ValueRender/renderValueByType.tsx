import { isValidCron } from 'cron-validator';
import React from 'react';

import { EMPTY_VALUE } from '@dg3/types';
import { checkValueForFloatAndRound, checkValueForIsoDate } from '@dg3/utils';
import { LocalizedCronExpression } from '../Date/LocalizedCronExpression';
import { LocalizedIsoDate } from '../Date/LocalizedIsoDate';

export const renderValueByType = (value, options?) => {
  if (typeof value === 'boolean') {
    return String(value);
  }

  if (checkValueForIsoDate(value)) {
    return <LocalizedIsoDate isoString={value} />;
  }

  if (typeof value === 'string' && isValidCron(value)) {
    return (
      <LocalizedCronExpression
        expression={value}
        weekStartsOnSunday={options?.week_starts_on_sunday}
      />
    );
  }

  // Empty string should be displayed as empty string?? wait for David
  if (value === '') return value;

  // TODO: fallback for object in order to prevent errors
  //  maybe it will be required in future to display
  if (typeof value === 'object') {
    return EMPTY_VALUE;
  }

  if (!isNaN(Number(value))) {
    return checkValueForFloatAndRound(value);
  }

  return value;
};
