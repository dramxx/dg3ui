import React from 'react';

import { ClearIcon } from './ClearIcon';

export default {
  component: ClearIcon,
  title: 'Icons/ClearIcon',
};

export const defaultConfiguration = () => <ClearIcon />;

export const customSize = () => <ClearIcon width={'4rem'} height={'4rem'} />;

export const activeIcon = () => <ClearIcon active={true} />;

export const disabledIcon = () => <ClearIcon disabled={true} />;
