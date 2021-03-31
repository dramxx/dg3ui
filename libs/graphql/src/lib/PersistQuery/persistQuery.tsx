import { InMemoryCache } from '@apollo/client';

// Absolute path import because of circular deps
import { contentFilterVar } from '../ContentFilter/ContentFilterVar';
import { timeFilterVar } from '../TimeFilter/TimeFilterVar';
import { userVar } from '../User/UserVar';

export const persistQuery = (cache: InMemoryCache, key: string, value: any) => {
  window.addEventListener('unload', () => {
    // get data from reactiveVar()
    window.sessionStorage.setItem(key, JSON.stringify(value()));
  });

  const data = window.sessionStorage.getItem(key);
  if (data) {
    const jsonData = JSON.parse(data);

    // TODO: fix in future, there are PR on ApolloClient to make reactive var persistent
    switch (key) {
      case 'contentFilter':
        contentFilterVar(jsonData);
        break;
      case 'timeFilter':
        timeFilterVar(jsonData);
        break;
      case 'userDetails':
        userVar(jsonData);
        break;
    }
  }
};
