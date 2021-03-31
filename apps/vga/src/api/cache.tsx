import { InMemoryCache } from '@apollo/client';

import {
  backdropVar,
  contentFilterVar,
  mapVar,
  notificationsVar,
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
        map() {
          return mapVar();
        },
        theme() {
          return themeVar();
        },
        timeFilter() {
          return timeFilterVar();
        },
        user() {
          return userVar();
        },
      },
    },
  },
});
