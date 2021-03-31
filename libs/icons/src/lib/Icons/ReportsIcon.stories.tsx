import React from 'react';
import { ReportsIcon } from './ReportsIcon';

export default {
  component: ReportsIcon,
  title: 'Icons/ReportsIcon',
};

export const defaultConfiguration = () => <ReportsIcon />;

export const customSize = () => <ReportsIcon width={'4rem'} height={'4rem'} />;

export const activeIcon = () => <ReportsIcon active={true} />;
