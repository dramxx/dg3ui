import React from 'react';
import { EvsIcon } from './EvsIcon';

export default {
  component: EvsIcon,
  title: 'Icons/EvsIcon',
};

export const defaultConfiguration = () => <EvsIcon />;

export const customSize = () => <EvsIcon width={'4rem'} height={'4rem'} />;

export const customColor = () => <EvsIcon color={'red'} />;

export const activeIcon = () => <EvsIcon active={true} />;
