import { ApolloProvider, useQuery, useReactiveVar } from '@apollo/client';
import csLocale from 'date-fns/locale/cs';
import enLocale from 'date-fns/locale/en-US';
import { isNil } from 'ramda';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { GlobalStyle, SanitizeResetStyle, defaultTheme } from '@dg3/components';
import { USER_DETAILS, themeVar, userVar } from '@dg3/graphql';
import { PUBLIC_PATH } from '@dg3/endpoints';
import { LocaleTableProvider } from '@dg3/utils';
import csMessages from '../../../i18n/locales/cs.json';
import { apolloClient } from './api/apolloClient';
import { App } from './app/app';

const messages: Record<string, Record<string, string>> = {
  // en is default, needs no messages
  cs: csMessages,
};
const localeTable = {
  cs: csLocale,
  en: enLocale,
};

const Application = () => {
  const { data } = useQuery(USER_DETAILS);
  useEffect(() => {
    const user = data?.userDetail?.user;

    if (!isNil(user)) {
      sessionStorage.setItem('token', `Bearer ${user.token}`);
      userVar(user);
    }
  }, [data]);

  const theme = useReactiveVar(themeVar);
  const user = useReactiveVar(userVar);
  const locale = user?.locale || 'en';

  return (
    <ThemeProvider theme={isNil(theme) ? defaultTheme : theme}>
      <IntlProvider
        locale={locale}
        key={locale}
        defaultLocale="en"
        messages={messages[locale]}
      >
        <LocaleTableProvider value={localeTable}>
          <SanitizeResetStyle />
          <GlobalStyle />
          <BrowserRouter basename={PUBLIC_PATH}>
            <App />
          </BrowserRouter>
        </LocaleTableProvider>
      </IntlProvider>
    </ThemeProvider>
  );
};

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <Application />
  </ApolloProvider>,
  document.getElementById('root')
);
