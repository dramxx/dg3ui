import React from 'react';

import { ClearBinIcon } from './ClearBinIcon';

export default {
  component: ClearBinIcon,
  title: 'Icons/ClearBinIcon',
};

export const defaultConfiguration = () => <ClearBinIcon />;

export const customSize = () => <ClearBinIcon width={'4rem'} height={'4rem'} />;

export const customColor = () => <ClearBinIcon color={'IndianRed'} />;

export const activeIcon = () => <ClearBinIcon active={true} />;

export const disabledIcon = () => <ClearBinIcon disabled={true} />;
