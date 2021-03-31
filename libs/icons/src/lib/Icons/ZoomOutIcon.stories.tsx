import React from 'react';
import { ZoomOutIcon } from './ZoomOutIcon';

export default {
  component: ZoomOutIcon,
  title: 'Icons/ZoomOutIcon',
};

export const defaultConfiguration = () => <ZoomOutIcon />;

export const customSize = () => <ZoomOutIcon width={'4rem'} height={'4rem'} />;

export const customColor = () => <ZoomOutIcon color={'red'} />;

export const activeIcon = () => <ZoomOutIcon active={true} />;
