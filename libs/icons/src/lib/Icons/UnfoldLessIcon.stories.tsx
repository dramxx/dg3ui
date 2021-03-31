import React from 'react';
import {UnfoldLessIcon} from './UnfoldLessIcon';

export default {
  component: UnfoldLessIcon,
  title: 'Icons/UnfoldLessIcon',
};

export const defaultConfiguration = () => <UnfoldLessIcon />;

export const customSize = () => (
  <UnfoldLessIcon width={'4rem'} height={'4rem'} />
);

export const customColor = () => <UnfoldLessIcon color={'red'} />;

export const activeIcon = () => <UnfoldLessIcon active={true} />;
