import React from 'react';
import { InfoIcon } from './InfoIcon';

export default {
  component: InfoIcon,
  title: 'Icons/InfoIcon',
};

export const defaltConfiguration = () => <InfoIcon/>;

export const customSize = () => <InfoIcon width={'4rem'} height={'4rem'}/>;

export const customColor = () => <InfoIcon color={'red'}/>;
