import React from 'react';
import { UnfoldMoreIcon } from './UnfoldMoreIcon';

export default {
  component: UnfoldMoreIcon,
  title: 'Icons/UnfoldMoreIcon',
};

export const defaultConfiguration = () => <UnfoldMoreIcon />;

export const customSize = () => (
  <UnfoldMoreIcon width={'4rem'} height={'4rem'} />
);

export const customColor = () => <UnfoldMoreIcon color={'red'} />;

export const activeIcon = () => <UnfoldMoreIcon active={true} />;
