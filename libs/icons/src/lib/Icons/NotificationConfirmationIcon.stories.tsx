import React from 'react';

import { NotificationConfirmationIcon } from './NotificationConfirmationIcon';

export default {
  component: NotificationConfirmationIcon,
  title: 'Icons/NotificationConfirmationIcon',
};

export const defaultConfiguration = () => <NotificationConfirmationIcon />;

export const customSize = () => (
  <NotificationConfirmationIcon width={'4rem'} height={'4rem'} />
);

export const customColor = () => (
  <NotificationConfirmationIcon color={'blue'} />
);
