import {
  backdropTypeDefs,
  contentFilterTypeDefs,
  mapTypeDefs,
  notificationsTypeDefs,
  reportsTypeDefs,
  themeTypeDefs,
  timeFilterTypeDefs,
  userTypeDefs,
} from '@dg3/graphql';

export const typeDefs = {
  ...backdropTypeDefs,
  ...contentFilterTypeDefs,
  ...mapTypeDefs,
  ...notificationsTypeDefs,
  ...reportsTypeDefs,
  ...themeTypeDefs,
  ...timeFilterTypeDefs,
  ...userTypeDefs,
};
