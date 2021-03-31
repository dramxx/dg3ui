import React from 'react';
import { SaveIcon } from './SaveIcon';

export default {
  component: SaveIcon,
  title: 'Icons/SaveIcon',
};

export const defaultConfiguration = () => <SaveIcon />;

export const customSize = () => (
  <SaveIcon width={'4rem'} height={'4rem'} />
);

export const activeIcon = () => <SaveIcon active={true} />;
