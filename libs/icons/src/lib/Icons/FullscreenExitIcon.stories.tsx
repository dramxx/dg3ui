import React from 'react';
import { FullscreenExitIcon } from './FullscreenExitIcon';

export default {
  component: FullscreenExitIcon,
  title: 'Icons/FullscreenExitIcon',
};

export const defaultConfiguration = () => <FullscreenExitIcon />;

export const customSize = () => (
  <FullscreenExitIcon width={'4rem'} height={'4rem'} />
);

export const activeIcon = () => <FullscreenExitIcon active={true} />;
