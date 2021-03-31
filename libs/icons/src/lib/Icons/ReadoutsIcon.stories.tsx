import React from 'react';
import { ReadoutsIcon } from './ReadoutsIcon';

export default {
  component: ReadoutsIcon,
  title: 'Icons/ReadoutsIcon',
};

export const defaultConfiguration = () => <ReadoutsIcon />;

export const customSize = () => <ReadoutsIcon width={'4rem'} height={'4rem'} />;

export const activeIcon = () => <ReadoutsIcon active={true} />;
