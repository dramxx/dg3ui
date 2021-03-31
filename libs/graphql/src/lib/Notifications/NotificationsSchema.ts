import gql from 'graphql-tag';

export const notificationsTypeDefs = gql`
  extend type Query {
    notifications: [Notification]
  }

  type Notification {
    is: String!
    type: String!
    message: String!
  }

  input InputNotification {
    type: String!
    message: String!
  }

  input InputNotifications {
    notifications: [InputNotification]
  }
`;
