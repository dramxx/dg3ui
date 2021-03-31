import React from 'react';
import { DevicesIcon } from './DevicesIcon';

export default {
  component: DevicesIcon,
  title: 'Icons/DevicesIcon',
};

export const defaultConfiguration = () => <DevicesIcon />;

export const customSize = () => <DevicesIcon width={'4rem'} height={'4rem'} />;

export const customColor = () => <DevicesIcon color={'red'} />;

export const activeIcon = () => <DevicesIcon active={true} />;
