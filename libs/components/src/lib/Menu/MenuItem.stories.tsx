import React from 'react';
import { MenuItem } from './MenuItem';
import { LogoutIcon } from '@dg3/icons';

export default {
  component: MenuItem,
  title: 'MenuItem',
};

export const MenuItemWithIconChildren = () => (
  <MenuItem
    active={false}
    label={'Logout'}
    onClick={() => {}}
    children={<LogoutIcon width={'20px'} height={'20px'} color={'red'} />}
  />
);
