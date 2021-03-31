import React from 'react';
import {SelectionIcon} from './SelectionIcon';

export default {
  component: SelectionIcon,
  title: 'Icons/SelectionIcon',
};

export const defaultConfiguration = () => <SelectionIcon />;

export const customSize = () => (
  <SelectionIcon width={'4rem'} height={'4rem'} />
);

export const customColor = () => <SelectionIcon color={'red'} />;

export const activeIcon = () => <SelectionIcon active={true} />;
