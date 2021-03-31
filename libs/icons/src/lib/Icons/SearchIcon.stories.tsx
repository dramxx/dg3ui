import React from 'react';
import {SearchIcon} from './SearchIcon';

export default {
  component: SearchIcon,
  title: 'Icons/SearchIcon',
};

export const defaultConfiguration = () => <SearchIcon />;

export const customSize = () => <SearchIcon width={'4rem'} height={'4rem'} />;

export const customColor = () => <SearchIcon color={'red'} />;

export const activeIcon = () => <SearchIcon active={true} />;
