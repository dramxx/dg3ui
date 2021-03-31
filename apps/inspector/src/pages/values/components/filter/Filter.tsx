import TimePicker from '@components/time-picker';
import * as SharedStore from '@store/shared';
import React, { useState } from 'react';

import { PrimaryButton } from '@dg3/components';
import { TimeFilterPreset } from '@dg3/types';
import { StyledFilter } from './styles';

export interface FilterProps {
  onRefresh: () => void;
}

export const Filter: React.FC<FilterProps> = (props) => {
  const { onRefresh } = props;

  const SharedActions = SharedStore.useActions();
  const dateRange = SharedStore.useSelector((state) => state.dateRange);
  const [preset, setPreset] = useState<TimeFilterPreset>('DAY');

  const setInterval = (value: Interval) => {
    SharedActions.setDateRange(value);
  };

  return (
    <StyledFilter>
      <TimePicker
        onChange={(interval, preset) => {
          setInterval(interval);
          setPreset(preset);
        }}
        range={dateRange}
        preset={preset}
      />
      <PrimaryButton onClick={onRefresh}>Refresh</PrimaryButton>
    </StyledFilter>
  );
};

export default Filter;
