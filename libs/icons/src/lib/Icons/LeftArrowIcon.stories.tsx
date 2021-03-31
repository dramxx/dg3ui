import React from 'react';
import {LeftArrowIcon} from './LeftArrowIcon';

export default {
  component: LeftArrowIcon,
  title: 'Icons/LeftArrowIcon',
};

export const defaultConfiguration = () => <LeftArrowIcon />;

export const customSize = () => (
  <LeftArrowIcon width={'4rem'} height={'4rem'} />
);

export const customColor = () => <LeftArrowIcon color={'red'} />;

export const activeIcon = () => <LeftArrowIcon active={true} />;
