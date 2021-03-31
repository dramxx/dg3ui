import React from 'react';
import { TOUIcon } from './TOUIcon';

export default {
  component: TOUIcon,
  title: 'Icons/TOUIcon',
};

export const defaultConfiguration = () => <TOUIcon />;

export const customSize = () => <TOUIcon width={'4rem'} height={'4rem'} />;

export const activeIcon = () => <TOUIcon active={true} />;
