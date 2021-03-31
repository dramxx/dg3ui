import React from 'react';
import { BinIcon } from './BinIcon';

export default {
  component: BinIcon,
  title: 'Icons/BinIcon',
};

export const defaultConfiguration = () => <BinIcon />;

export const customSize = () => <BinIcon width={'4rem'} height={'4rem'} />;

export const customColor = () => <BinIcon color={'red'} />;
