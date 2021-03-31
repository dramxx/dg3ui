import React from 'react';
import { DownArrowIcon } from './DownArrowIcon';

export default {
  component: DownArrowIcon,
  title: 'Icons/DownArrowIcon',
};

export const defaultConfiguration = () => <DownArrowIcon />;

export const customSize = () => (
  <DownArrowIcon width={'4rem'} height={'4rem'} />
);

export const customColor = () => <DownArrowIcon color={'red'} />;
