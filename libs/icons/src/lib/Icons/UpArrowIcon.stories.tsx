import React from 'react';
import { UpArrowIcon } from './UpArrowIcon';

export default {
  component: UpArrowIcon,
  title: 'Icons/UpArrowIcon',
};

export const defaultConfiguration = () => <UpArrowIcon />;

export const customSize = () => <UpArrowIcon width={'4rem'} height={'4rem'} />;

export const customColor = () => <UpArrowIcon color={'red'} />;
