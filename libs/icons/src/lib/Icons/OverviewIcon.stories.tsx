import React from 'react';
import { OverviewIcon } from './OverviewIcon';

export default {
  component: OverviewIcon,
  title: 'Icons/OverviewIcon',
};

export const defaultConfiguration = () => <OverviewIcon />;

export const customSize = () => <OverviewIcon width={'4rem'} height={'4rem'} />;

export const activeIcon = () => <OverviewIcon active={true} />;
