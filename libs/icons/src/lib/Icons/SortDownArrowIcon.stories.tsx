import React from 'react';

import { SortDownArrowIcon } from './SortDownArrowIcon';

export default {
  component: SortDownArrowIcon,
  title: 'Icons/SortDownArrowIcon',
};

export const defaultConfiguration = () => <SortDownArrowIcon />;

export const customSize = () => (
  <SortDownArrowIcon width={'4rem'} height={'4rem'} />
);

export const customColor = () => <SortDownArrowIcon color={'red'} />;
