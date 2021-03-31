import { makeVar } from '@apollo/client';

import { TimeFilterValue } from '@dg3/types';
import { defaultTimeFilterObject } from './DefaultTimeFilterObject';

export const timeFilterVar = makeVar<TimeFilterValue>(defaultTimeFilterObject);
