import React from 'react';
import { FilterIcon } from './FilterIcon';

export default {
  component: FilterIcon,
  title: 'Icons/FilterIcon',
};

export const defaultConfiguration = () => <FilterIcon />;

export const customSize = () => <FilterIcon width={'4rem'} height={'4rem'} />;

export const activeIcon = () => <FilterIcon active={true} />;
