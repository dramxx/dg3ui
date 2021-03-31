import React from 'react';
import { LocationIcon } from './LocationIcon';

export default {
  component: LocationIcon,
  title: 'Icons/LocationIcon',
};

export const defaultConfiguration = () => <LocationIcon />;

export const customSize = () => <LocationIcon width={'4rem'} height={'4rem'} />;

export const activeIcon = () => <LocationIcon active={true} />;
