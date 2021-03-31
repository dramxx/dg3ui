import React from 'react';
import {LeftDoubleArrowIcon} from './LeftDoubleArrowIcon';

export default {
  component: LeftDoubleArrowIcon,
  title: 'Icons/LeftDoubleArrowIcon',
};

export const defaultConfiguration = () => <LeftDoubleArrowIcon />;

export const customSize = () => (
  <LeftDoubleArrowIcon width={'4rem'} height={'4rem'} />
);

export const customColor = () => <LeftDoubleArrowIcon color={'red'} />;

export const activeIcon = () => <LeftDoubleArrowIcon active={true} />;
