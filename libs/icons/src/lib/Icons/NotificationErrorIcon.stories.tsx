import React from 'react';

import { NotificationErrorIcon } from './NotificationErrorIcon';

export default {
  component: NotificationErrorIcon,
  title: 'Icons/NotificationErrorIcon',
};

export const defaultConfiguration = () => <NotificationErrorIcon />;

export const customSize = () => (
  <NotificationErrorIcon width={'4rem'} height={'4rem'} />
);

export const customColor = () => <NotificationErrorIcon color={'blue'} />;
