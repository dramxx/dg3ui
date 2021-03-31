import { useReactiveVar } from '@apollo/client';
import * as React from 'react';
import styled from 'styled-components';

import { notificationsVar } from '@dg3/graphql';
import { UserNotification } from '@dg3/types';
import { Notification } from '../Notification/Notification';

const StyledNotificationsBar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const NotificationsBar = () => {
  const notifications = useReactiveVar(notificationsVar);

  const handleClose = (id: string) => {
    notificationsVar(
      notifications.filter(
        (notification: UserNotification) => notification.id !== id
      )
    );
  };

  return (
    <StyledNotificationsBar>
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          open={true}
          notification={notification}
          onClose={handleClose}
        />
      ))}
    </StyledNotificationsBar>
  );
};
