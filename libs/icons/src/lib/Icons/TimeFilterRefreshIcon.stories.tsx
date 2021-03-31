import React from 'react';
import { TimeFilterRefreshIcon } from './TimeFilterRefreshIcon';

export default {
  component: TimeFilterRefreshIcon,
  title: 'Icons/TimeFilterRefreshIcon',
};

export const defaultConfiguration = () => <TimeFilterRefreshIcon />;

export const customSize = () => (
  <TimeFilterRefreshIcon width={'4rem'} height={'4rem'} />
);

export const activeIcon = () => <TimeFilterRefreshIcon active={true} />;
