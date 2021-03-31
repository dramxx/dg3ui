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
 * Workbench provides wrapper component around our applications
 * like `Inventory, Reporst` a.s.o.
 */
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { GlobalStyle, SanitizeResetStyle } from '@dg3/components';
import { END_POINT, EXPRESS_SERVER_URL, GRAPHQL_URL } from '@dg3/endpoints';
import {
  USER_DETAILS,
  jsonlinesErrorLink,
  parseJsonLines,
  serializeJsonLines,
  serializeJsonLinesText,
  themeVar,
  userVar,
} from '@dg3/graphql';
import { LocaleTableProvider, path } from '@dg3/utils';
import csMessages from '../../../i18n/locales/cs.json';
import { cache } from './api/cache';
import { typeDefs } from './api/typeDefs';
import App from './app/App';

const messages = {
  en: null, // default language
  cs: csMessages,
};
const localeTable = {
  cs: csLocale,
  en: enLocale,
};

const httpLink = new HttpLink({
  uri: GRAPHQL_URL,
});

const restLink = new RestLink({
  endpoints: {
    psql: `${EXPRESS_SERVER_URL}${path(END_POINT.db.path)}`,
    user: `${EXPRESS_SERVER_URL}${path(END_POINT.userDetail.path)}`,
    logout: `${EXPRESS_SERVER_URL}${path(END_POINT.logout.path)}`,
  },
  bodySerializers: {
    jsonlinestext: serializeJsonLinesText,
    jsonlines: serializeJsonLines,
  },
});

const client = new ApolloClient({
  cache,
  typeDefs,
  link: ApolloLink.from([jsonlinesErrorLink, restLink, httpLink]),
  connectToDevTools: true,
  assumeImmutableResults: true,
});

const Application = () => {
  const theme = themeVar();
  const { data } = useQuery(USER_DETAILS);
  const user = useReactiveVar(userVar);

  const locale = user?.locale || 'en';

  useEffect(() => {
    const user = data?.userDetails?.user;
    userVar(user);
  }, [data]);

  return (
    <ThemeProvider theme={theme}>
      <IntlProvider
        locale={locale}
        key={locale}
        defaultLocale={'en'}
        messages={messages[locale]}
      >
        <LocaleTableProvider value={localeTable}>
          <BrowserRouter>
            <SanitizeResetStyle />
            <GlobalStyle />
            <App />
          </BrowserRouter>
        </LocaleTableProvider>
      </IntlProvider>
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
