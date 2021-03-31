import React from 'react';
import { SettingsIcon } from './SettingsIcon';

export default {
  component: SettingsIcon,
  title: 'Icons/SettingsIcon',
};

export const defaultConfiguration = () => <SettingsIcon />;

export const customSize = () => <SettingsIcon width={'4rem'} height={'4rem'} />;

export const activeIcon = () => <SettingsIcon active={true} />;
