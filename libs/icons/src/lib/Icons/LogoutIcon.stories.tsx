import React from 'react';
import { LogoutIcon } from './LogoutIcon';

export default {
  component: LogoutIcon,
  title: 'Icons/LogoutIcon',
};

export const defaultConfiguration = () => <LogoutIcon />;

export const customSize = () => <LogoutIcon width={'4rem'} height={'4rem'} />;

export const activeIcon = () => <LogoutIcon active={true} />;
