import React from 'react';
import {DoneIcon} from './DoneIcon';

export default {
  component: DoneIcon,
  title: 'Icons/DoneIcon',
};

export const defaultConfiguration = () => <DoneIcon />;

export const customSize = () => <DoneIcon width={'4rem'} height={'4rem'} />;

export const customColor = () => <DoneIcon color={'red'} />;
