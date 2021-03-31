import React from 'react';
import {RightDoubleArrowIcon} from './RightDoubleArrowIcon';

export default {
  component: RightDoubleArrowIcon,
  title: 'Icons/RightDoubleArrowIcon',
};

export const defaultConfiguration = () => <RightDoubleArrowIcon />;

export const customSize = () => (
  <RightDoubleArrowIcon width={'4rem'} height={'4rem'} />
);

export const customColor = () => <RightDoubleArrowIcon color={'red'} />;

export const activeIcon = () => <RightDoubleArrowIcon active={true} />;
