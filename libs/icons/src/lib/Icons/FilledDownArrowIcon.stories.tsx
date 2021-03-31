import React from 'react';
import {FilledDownArrowIcon} from './FilledDownArrowIcon';

export default {
  component: FilledDownArrowIcon,
  title: 'Icons/FilledDownArrowIcon',
};

export const defaultConfiguration = () => <FilledDownArrowIcon />;

export const customSize = () => (
  <FilledDownArrowIcon width={'4rem'} height={'4rem'} />
);

export const customColor = () => <FilledDownArrowIcon color={'red'} />;

export const activeIcon = () => <FilledDownArrowIcon active={true} />;
