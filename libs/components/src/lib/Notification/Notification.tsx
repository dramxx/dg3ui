import Snackbar from '@material-ui/core/Snackbar';
import React from 'react';
import styled from 'styled-components';

import { UserNotification, UserNotificationType } from '@dg3/types';
import { ErrorNotification } from './ErrorNotification';
import { InfoNotification } from './InfoNotification';
import { SuccessNotification } from './SuccessNotification';
import { WarningNotification } from './WarningNotification';

const StyledNotificationWrapper = styled.div`
  min-height: 44px;
  background-color: ${(props) => props.theme.colors.white};
  border: 3px solid ${(props) => props.theme.colors.grey1};
  border-radius: ${(props) => props.theme.radius.small};
  padding: ${(props) => props.theme.spacing.small};
  box-shadow: ${(props) => props.theme.shadows.shadow5};
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  z-index: ${(props) => props.theme.zIndex.modalContent};
`;

type Props = {
  open: boolean;
  onClose: (id: string) => void;
  notification: UserNotification;
};

export const Notification: React.FC<Props> = (props: Props) => {
  const { open, notification, onClose } = props;
  const duration = notification.type === 'error' ? null : 3000;
  const getNotificationType = (type: UserNotificationType) => {
    switch (type) {
      case 'error':
        return (
          <ErrorNotification
            message={notification.message}
            fullError={notification.fullError}
            onClose={handleClose}
          />
        );
      case 'success':
        return <SuccessNotification message={notification.message} />;
      case 'info':
        return <InfoNotification message={notification.message} />;
      case 'warning':
        return <WarningNotification message={notification.message} />;
    }
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    // Clickaway click wont be closing notification
    if (reason === 'clickaway') {
      return;
    }
    onClose(notification.id);
  };

  return (
    <Snackbar
      anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
      open={open}
      onClose={handleClose}
      autoHideDuration={duration}
      style={{
        maxWidth: '75%',
        overflow: 'hidden',
      }}
    >
      <StyledNotificationWrapper>
        {getNotificationType(notification.type)}
      </StyledNotificationWrapper>
    </Snackbar>
  );
};
