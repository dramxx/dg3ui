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
import { removeTimeZoneName } from '@dg3/utils';

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
        userDetails() {
          return userVar();
        },
        diosSet: {
          merge: true,
        },
        devicesSet: {
          merge: true,
        },
        placesSet: {
          merge: true,
        },
      },
    },
    Dio: {
      fields: {
        startIndexing: {
          read(date) {
            return date && removeTimeZoneName(date);
          },
        },
        timestamp: {
          read(date) {
            return date && removeTimeZoneName(date);
          },
        },
      },
    },
  },
});
