import React from 'react';
import { TimeFilterCalendarIcon } from './TimeFilterCalendarIcon';

export default {
  component: TimeFilterCalendarIcon,
  title: 'Icons/TimeFilterCalendarIcon',
};

export const defaultConfiguration = () => <TimeFilterCalendarIcon />;

export const customSize = () => (
  <TimeFilterCalendarIcon width={'4rem'} height={'4rem'} />
);

export const activeIcon = () => <TimeFilterCalendarIcon active={true} />;
