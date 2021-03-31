import React from 'react';
import { KDIcon } from './KDIcon';

export default {
  component: KDIcon,
  title: 'Icons/KDIcon',
};

export const defaultConfiguration = () => <KDIcon />;

export const customSize = () => <KDIcon width={'4rem'} height={'4rem'} />;

export const activeIcon = () => <KDIcon active={true} />;
