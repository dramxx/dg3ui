import React from 'react';
import { NtlIcon } from './NTLIcon';

export default {
  component: NtlIcon,
  title: 'Icons/NtlIcon',
};

export const defaultConfiguration = () => <NtlIcon />;

export const customSize = () => <NtlIcon width={'4rem'} height={'4rem'} />;

export const activeIcon = () => <NtlIcon active={true} />;
