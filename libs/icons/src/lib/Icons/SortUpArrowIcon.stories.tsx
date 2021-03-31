import React from 'react';

import { SortUpArrowIcon } from './SortUpArrowIcon';

export default {
  component: SortUpArrowIcon,
  title: 'Icons/SortUpArrowIcon',
};

export const defaultConfiguration = () => <SortUpArrowIcon />;

export const customSize = () => (
  <SortUpArrowIcon width={'4rem'} height={'4rem'} />
);

export const customColor = () => <SortUpArrowIcon color={'red'} />;
