import React, { useState } from 'react';
import { format, subDays } from 'date-fns';
import { TimeFilterComponent } from './TimeFilterComponent';
import { TimeFilterPreset } from '@dg3/types';
import { TimeFilterPresets } from './TimeFilterPresets';

export default {
  title: 'TimeFilter|TimeFilter',
  component: TimeFilterComponent,
};

const initPreset = 'WEEK';
const initDate = subDays(new Date(), 6);

export const Default = () => {
  const [interval, setInterval] = useState(
    TimeFilterPresets[initPreset].create(initDate)
  );
  const [preset, setPreset] = useState<TimeFilterPreset>(initPreset);
  return (
    <>
      <div>
        {format(interval.start, 'yyyy-MM-dd HH:mm')} &mdash;{' '}
        {format(interval.end, 'yyyy-MM-dd HH:mm')}
      </div>
      <hr />
      <TimeFilterComponent
        value={interval}
        preset={preset}
        onChange={(interval, preset) => {
          setInterval(interval);
          setPreset(preset);
        }}
      />
    </>
  );
};
