import React from 'react';
import { CircleButton } from './CircleButton';
import { BinIcon } from '@dg3/icons';

export default {
  component: CircleButton,
  title: 'CircleButton',
};

export const circleButton = () => (
  <CircleButton radius={'20px'} onClick={() => 1 + 1}>
    {/*<CalendarIcon />*/}
  </CircleButton>
);

export const circleButtonDisabled = () => (
  <CircleButton radius={'20px'} disabled={true} onClick={() => 1 + 1}>
    {/*<CalendarIcon />*/}
  </CircleButton>
);

export const circleButtonWithIcon = () => (
  <CircleButton radius={'20px'} onClick={() => 1 + 1}>
    <BinIcon />
  </CircleButton>
);
