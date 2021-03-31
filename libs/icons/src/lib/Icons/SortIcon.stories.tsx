import React from 'react';
import {SortIcon} from './SortIcon';

export default {
  component: SortIcon,
  title: 'Icons/SortIcon',
};

export const defaultConfiguration = () => <SortIcon />;

export const customSize = () => <SortIcon width={'4rem'} height={'4rem'} />;

export const customColor = () => <SortIcon color={'red'} />;

export const activeIcon = () => <SortIcon active={true} />;
