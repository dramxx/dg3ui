import React from 'react';
import {DotsIcon} from './DotsIcon';

export default {
  component: DotsIcon,
  title: 'Icons/DotsIcon',
};

export const defaultConfiguration = () => <DotsIcon />;

export const customSize = () => <DotsIcon width={'4rem'} height={'4rem'} />;

export const customColor = () => <DotsIcon color={'red'} />;
