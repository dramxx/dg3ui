import React from 'react';
import {RightArrowIcon} from './RightArrowIcon';

export default {
  component: RightArrowIcon,
  title: 'Icons/RightArrowIcon',
};

export const defaultConfiguration = () => <RightArrowIcon />;

export const customSize = () => (
  <RightArrowIcon width={'4rem'} height={'4rem'} />
);

export const customColor = () => <RightArrowIcon color={'red'} />;

export const activeIcon = () => <RightArrowIcon active={true} />;
