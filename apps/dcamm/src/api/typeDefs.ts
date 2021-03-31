import {
  backdropTypeDefs,
  contentFilterTypeDefs,
  exportedFilesTypeDefs,
  mapTypeDefs,
  notificationsTypeDefs,
  reportsTypeDefs,
  savedFiltersTypeDefs,
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
  ...savedFiltersTypeDefs,
  ...exportedFilesTypeDefs,
  ...timeFilterTypeDefs,
  ...themeTypeDefs,
  ...userTypeDefs,
};
