import React from 'react';
import { CommunicationIcon } from './CommunicationIcon';

export default {
  component: CommunicationIcon,
  title: 'Icons/CommunicationIcon',
};

export const defaultConfiguration = () => <CommunicationIcon />;

export const customSize = () => <CommunicationIcon width={'4rem'} height={'4rem'} />;

export const activeIcon = () => <CommunicationIcon active={true} />;
