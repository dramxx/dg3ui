import React from 'react';
import { PcdIcon } from './PcdIcon';

export default {
  component: PcdIcon,
  title: 'Icons/PcdIcon',
};

export const defaultConfiguration = () => <PcdIcon />;

export const customSize = () => <PcdIcon width={'4rem'} height={'4rem'} />;

export const activeIcon = () => <PcdIcon active={true} />;
