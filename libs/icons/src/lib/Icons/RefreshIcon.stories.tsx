import React from 'react';
import {RefreshIcon} from './RefreshIcon';

export default {
  component: RefreshIcon,
  title: 'Icons/RefreshIcon',
};

export const defaultConfiguration = () => <RefreshIcon />;

export const customSize = () => <RefreshIcon width={'4rem'} height={'4rem'} />;

export const customColor = () => <RefreshIcon color={'red'} />;

export const activeIcon = () => <RefreshIcon active={true} />;
