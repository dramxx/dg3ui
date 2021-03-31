import React from 'react';
import { PlusIcon } from './PlusIcon';

export default {
  component: PlusIcon,
  title: 'Icons/PlusIcon',
};

export const defaultConfiguration = () => <PlusIcon />;

export const customSize = () => <PlusIcon width={'2rem'} height={'2rem'} />;

export const customColor = () => <PlusIcon color={'red'} />;
