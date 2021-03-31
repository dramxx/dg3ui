import {
  backdropTypeDefs,
  contentFilterTypeDefs,
  mapTypeDefs,
  reportsTypeDefs,
  themeTypeDefs,
  timeFilterTypeDefs,
  userTypeDefs,
} from '@dg3/graphql';

export const typeDefs = {
  ...backdropTypeDefs,
  ...contentFilterTypeDefs,
  ...timeFilterTypeDefs,
  ...mapTypeDefs,
  ...userTypeDefs,
  ...reportsTypeDefs,
  ...themeTypeDefs,
};
