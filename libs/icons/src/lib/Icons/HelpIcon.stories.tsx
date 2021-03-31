import React from 'react';
import { HelpIcon } from './HelpIcon';

export default {
  component: HelpIcon,
  title: 'Icons/HelpIcon',
};

export const defaultConfiguration = () => <HelpIcon />;

export const customSize = () => <HelpIcon width={'4rem'} height={'4rem'} />;

export const activeIcon = () => <HelpIcon active={true} />;
