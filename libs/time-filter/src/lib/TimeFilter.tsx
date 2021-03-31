import { useReactiveVar } from '@apollo/client';
import React, { FC } from 'react';

import { timeFilterVar } from '@dg3/graphql';
import { TimeFilterComponent } from './TimeFilterComponent';

export const TimeFilter: FC = () => {
  const timeFilter = useReactiveVar(timeFilterVar);

  return (
    <TimeFilterComponent
      value={{
        start: new Date(timeFilter.from),
        end: new Date(timeFilter.to),
      }}
      preset={timeFilter.preset}
      onChange={(interval, preset) =>
        timeFilterVar({
          from: new Date(interval.start).toISOString(),
          to: new Date(interval.end).toISOString(),
          preset,
        })
      }
    />
  );
};
