import { InMemoryCache } from '@apollo/client';

import {
  backdropVar,
  contentFilterVar,
  notificationsVar,
  reportsVar,
  savedFiltersVar,
  themeVar,
  timeFilterVar,
  userVar,
} from '@dg3/graphql';

// default cache setup
export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        backdrop() {
          return backdropVar();
        },
        contentFilter() {
          return contentFilterVar();
        },
        notifications() {
          return notificationsVar();
        },
        reports() {
          return reportsVar();
        },
        savedFilters() {
          return savedFiltersVar();
        },
        timeFilter() {
          return timeFilterVar();
        },
        theme() {
          return themeVar();
        },
        user() {
          return userVar();
        },
      },
    },
  },
});
