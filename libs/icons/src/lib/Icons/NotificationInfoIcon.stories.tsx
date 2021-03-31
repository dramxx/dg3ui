import React from 'react';

import { NotificationInfoIcon } from './NotificationInfoIcon';

export default {
  component: NotificationInfoIcon,
  title: 'Icons/NotificationInfoIcon',
};

export const defaultConfiguration = () => <NotificationInfoIcon />;

export const customSize = () => (
  <NotificationInfoIcon width={'4rem'} height={'4rem'} />
);

export const customColor = () => (
  <NotificationInfoIcon color={'blue'} />
);
