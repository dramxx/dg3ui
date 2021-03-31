import React from 'react';
import { FullscreenIcon } from './FullscreenIcon';

export default {
  component: FullscreenIcon,
  title: 'Icons/FullscreenIcon',
};

export const defaultConfiguration = () => <FullscreenIcon />;

export const customSize = () => (
  <FullscreenIcon width={'4rem'} height={'4rem'} />
);

export const activeIcon = () => <FullscreenIcon active={true} />;
