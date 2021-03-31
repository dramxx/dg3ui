import React from 'react';
import { ConfigurationIcon } from './ConfigurationIcon';

export default {
  component: ConfigurationIcon,
  title: 'Icons/ConfigurationIcon',
};

export const defaultConfiguration = () => <ConfigurationIcon />;

export const customSize = () => <ConfigurationIcon width={'4rem'} height={'4rem'} />;

export const activeIcon = () => <ConfigurationIcon active={true} />;
