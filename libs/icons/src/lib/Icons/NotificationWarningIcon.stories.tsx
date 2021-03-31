import React from 'react';

import { NotificationWarningIcon } from './NotificationWarningIcon';

export default {
  component: NotificationWarningIcon,
  title: 'Icons/NotificationWarningIcon',
};

export const defaultConfiguration = () => <NotificationWarningIcon />;

export const customSize = () => (
  <NotificationWarningIcon width={'4rem'} height={'4rem'} />
);

export const customColor = () => (
  <NotificationWarningIcon color={'blue'} />
);
