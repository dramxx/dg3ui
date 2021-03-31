import React, { useState } from 'react';
import { TimeFilterDropdown } from './TimeFilterDropdown';
import { TimeFilterPreset } from '@dg3/types';

export default {
  title: 'TimeFilter|TimeFilterDropdown',
  component: TimeFilterDropdown,
};

export const Default = () => {
  const [preset, setPreset] = useState<TimeFilterPreset>('DAY');
  return <TimeFilterDropdown onPresetSelect={setPreset} preset={preset} />;
};
