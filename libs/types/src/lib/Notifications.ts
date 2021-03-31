export type UserNotification = {
  id: string;
  type: UserNotificationType;
  message: string;
  fullError?: string;
};

export type UserNotificationType = keyof NotificationReturnType;

export type NotificationReturnType = {
  error: (message: string, fullError?: string) => void;
  success: (message: string) => void;
  info: (message: string) => void;
  warning: (message: string) => void;
};
