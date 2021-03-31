import React from 'react';
import { LoadBalanceIcon } from './LoadBalanceIcon';

export default {
  component: LoadBalanceIcon,
  title: 'Icons/LoadBalanceIcon',
};

export const defaultConfiguration = () => <LoadBalanceIcon />;

export const customSize = () => (
  <LoadBalanceIcon width={'4rem'} height={'4rem'} />
);

export const activeIcon = () => <LoadBalanceIcon active={true} />;
