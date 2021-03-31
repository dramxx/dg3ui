import { configureStore } from '@reduxjs/toolkit';

import logger from './middleware/logger';
import RootReducer from './root-reducer';

export function createReduxStore() {
  return configureStore({
    reducer: RootReducer,
    middleware: (getDefaultMiddleware) => {
      const middleware = getDefaultMiddleware({
        immutableCheck: true,
        serializableCheck: false,
        thunk: false,
      });
      if (process.env.NODE_ENV === 'development') {
        middleware.push(logger);
      }
      return middleware;
    },
  });
}
