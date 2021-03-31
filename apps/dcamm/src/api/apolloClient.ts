import { ApolloClient, ApolloLink, HttpLink } from '@apollo/client';
import { RestLink } from 'apollo-link-rest';

import { END_POINT, EXPRESS_SERVER_URL, GRAPHQL_URL } from '@dg3/endpoints';
import {
  authBearerLink,
  contentFilterVar,
  jsonlinesErrorLink,
  parseJsonLines,
  persistQuery,
  serializeJsonLines,
  serializeJsonLinesText,
  timeFilterVar,
  userVar,
} from '@dg3/graphql';
import { path } from '@dg3/utils';
import { cache } from './cache';
import { typeDefs } from './typeDefs';

const restLink = new RestLink({
  endpoints: {
    psql: `${EXPRESS_SERVER_URL}${path(END_POINT.db.path)}`,
    user: `${EXPRESS_SERVER_URL}${path(END_POINT.userDetail.path)}`,
    logout: `${EXPRESS_SERVER_URL}${path(END_POINT.logout.path)}`,
    inventory: {
      uri: `${EXPRESS_SERVER_URL}${path(END_POINT.inventory.path)}`,
      responseTransformer: parseJsonLines,
    },
    catalog: {
      uri: `${EXPRESS_SERVER_URL}${path(END_POINT.catalog.path)}`,
      responseTransformer: parseJsonLines,
    },
    taskController: {
      uri: `${EXPRESS_SERVER_URL}${path(END_POINT.taskController.path)}`,
      responseTransformer: parseJsonLines,
    },
  },
  bodySerializers: {
    jsonlinestext: serializeJsonLinesText,
    jsonlines: serializeJsonLines,
  },
});

const httpLink = new HttpLink({
  uri: GRAPHQL_URL,
});

persistQuery(cache, 'contentFilter', contentFilterVar);
persistQuery(cache, 'timeFilter', timeFilterVar);
persistQuery(cache, 'userDetails', userVar);

window.addEventListener('unload', () => {
  sessionStorage.removeItem('token');
});

export const apolloClient = new ApolloClient({
  cache,
  typeDefs,
  link: ApolloLink.from([
    authBearerLink,
    jsonlinesErrorLink,
    restLink,
    httpLink,
  ]),
  connectToDevTools: true,
  assumeImmutableResults: true,
});
