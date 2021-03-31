import React from 'react';
import { MonitoringIcon } from './MonitoringIcon';

export default {
  component: MonitoringIcon,
  title: 'Icons/MonitoringIcon',
};

export const defaultConfiguration = () => <MonitoringIcon />;

export const customSize = () => (
  <MonitoringIcon width={'4rem'} height={'4rem'} />
);

export const activeIcon = () => <MonitoringIcon active={true} />;
