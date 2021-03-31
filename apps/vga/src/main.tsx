import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  HttpLink,
  useQuery,
  useReactiveVar,
} from '@apollo/client';
import { RestLink } from 'apollo-link-rest';
import csLocale from 'date-fns/locale/cs';
import enLocale from 'date-fns/locale/en-US';
/**
 * VGA application provides wrapper component around vga applications
 * like NTL, EV charging
 */
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import {
  GlobalStyle,
  SanitizeResetStyle,
  defaultVGATheme,
} from '@dg3/components';
import { END_POINT } from '@dg3/endpoints';
import { USER_DETAILS, userVar } from '@dg3/graphql';
import { UnityPlayerProvider } from '@dg3/unity-player';
import { LocaleTableProvider, path } from '@dg3/utils';
import messages_cs from '../../../i18n/locales/cs.json';
import { cache } from './api/cache';
import { resolvers } from './api/resolvers';
import { typeDefs } from './api/typeDefs';
import App from './app/app';

const messages = {
  en: null, // default language
  cs: messages_cs,
};
const localeTable = {
  cs: csLocale,
  en: enLocale,
};

const PSQL_URL = process.env.PSQL_URL ?? 'http://172.22.16.212:4000';
const KC_SERVER_ENDPOINT_URL =
  process.env.KC_SERVER_ENDPOINT_URL ?? 'http://localhost:4000';
const GRAPHQL_URL =
  process.env.GRAPHQL_URL ?? 'http://172.22.16.212:4001/graphql';

const restLink = new RestLink({
  endpoints: {
    psql: `${PSQL_URL}${path(END_POINT.db.path)}`,
    user: `${KC_SERVER_ENDPOINT_URL}${path(END_POINT.userDetail.path)}`,
    logout: `${KC_SERVER_ENDPOINT_URL}${path(END_POINT.logout.path)}`,
  },
  headers: {
    'Content-Type': 'application/json',
  },
});

const httpLink = new HttpLink({
  uri: GRAPHQL_URL,
});

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([restLink, httpLink]),
  typeDefs,
  resolvers,
  connectToDevTools: true,
  assumeImmutableResults: true,
});

const Application = () => {
  const { data } = useQuery(USER_DETAILS);
  const user = useReactiveVar(userVar);

  const locale = user.locale;

  useEffect(() => {
    const user = data?.userDetails?.user;
    userVar(user);
  }, [data]);

  return (
    <ThemeProvider theme={defaultVGATheme}>
      <UnityPlayerProvider>
        <IntlProvider
          locale={locale}
          key={locale}
          defaultLocale={'en'}
          messages={messages[locale]}
        >
          <LocaleTableProvider value={localeTable}>
            <BrowserRouter basename={'/vga_sample/'}>
              <SanitizeResetStyle />
              <GlobalStyle />
              <App />
            </BrowserRouter>
          </LocaleTableProvider>
        </IntlProvider>
      </UnityPlayerProvider>
    </ThemeProvider>
  );
};

const Root = () => (
  <ApolloProvider client={client}>
    <Application />
  </ApolloProvider>
);

/**
 * Export Root as React Component
 * TODO: return React Root Component based on ENV settings
 * even if this one is working without problem it's better
 * to have this configurable.
 */
export default Root;

ReactDOM.render(<Root />, document.getElementById('root'));
