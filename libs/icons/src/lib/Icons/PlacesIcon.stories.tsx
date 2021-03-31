import React from 'react';
import { PlacesIcon } from './PlacesIcon';

export default {
  component: PlacesIcon,
  title: 'Icons/PlacesIcon',
};

export const defaultConfiguration = () => <PlacesIcon />;

export const customSize = () => <PlacesIcon width={'4rem'} height={'4rem'} />;

export const activeIcon = () => <PlacesIcon active={true} />;
