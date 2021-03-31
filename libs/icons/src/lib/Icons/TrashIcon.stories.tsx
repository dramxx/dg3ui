import React from 'react';
import { TrashIcon } from './TrashIcon';

export default {
  component: TrashIcon,
  title: 'Icons/BinIcon',
};

export const defaultConfiguration = () => <TrashIcon />;

export const customSize = () => <TrashIcon width={'4rem'} height={'4rem'} />;

export const customColor = () => <TrashIcon color={'red'} />;
