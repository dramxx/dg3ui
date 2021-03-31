import React from 'react';
import { PanelIcon } from './PanelIcon';

export default {
  component: PanelIcon,
  title: 'Icons/PanelIcon',
};

export const defaultConfiguration = () => <PanelIcon />;

export const customSize = () => <PanelIcon width={'4rem'} height={'4rem'} />;

export const activeIcon = () => <PanelIcon active={true} />;
