import { useReactiveVar } from '@apollo/client';

import { NotificationReturnType, UserNotificationType } from '@dg3/types';
import { randomId } from '@dg3/utils';
import { notificationsVar } from './NotificationsVar';

export const useNotification = (): NotificationReturnType => {
  const notifications = useReactiveVar(notificationsVar);

  const setNotification = (
    type: UserNotificationType,
    message: string,
    fullError?: string
  ) => {
    notificationsVar([
      ...notifications,
      {
        id: randomId(),
        type,
        message,
        fullError,
      },
    ]);
  };

  const addErrorNotification = (message: string, fullError?: string) => {
    setNotification('error', message, fullError);
  };

  const addSuccessNotification = (message: string) => {
    setNotification('success', message);
  };

  const addInfoNotification = (message: string) => {
    setNotification('info', message);
  };

  const addWarningNotification = (message: string) => {
    setNotification('warning', message);
  };

  return {
    error: addErrorNotification,
    success: addSuccessNotification,
    info: addInfoNotification,
    warning: addWarningNotification,
  };
};
