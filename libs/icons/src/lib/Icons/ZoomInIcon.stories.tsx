import React from 'react';
import { ZoomInIcon } from './ZoomInIcon';

export default {
  component: ZoomInIcon,
  title: 'Icons/ZoomInIcon',
};

export const defaultConfiguration = () => <ZoomInIcon />;

export const customSize = () => <ZoomInIcon width={'4rem'} height={'4rem'} />;

export const customColor = () => <ZoomInIcon color={'red'} />;

export const activeIcon = () => <ZoomInIcon active={true} />;
