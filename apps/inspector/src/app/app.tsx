import Graphiql from '@pages/graphiql';
import Instances from '@pages/instances';
import Values from '@pages/values';
import Workflows from '@pages/workflows';
import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';

import ErrorBoundary from '../components/error-boundary';
import MainMenu from '../components/main-menu';
import { EScreen } from '../model';
import { createReduxStore } from '../store/configure-store';
import * as SharedStore from '../store/shared';
import { StyledContent } from './styles';

export default function App() {
  const ReduxStore = React.useRef(createReduxStore()).current;

  const [screen, setScreen] = React.useState<EScreen>(() => ReduxStore.getState().shared.screen);

  ReduxStore.subscribe(() => setScreen(ReduxStore.getState().shared.screen));

  return (
    <ErrorBoundary>
      <ReduxProvider store={ReduxStore}>
        <StyledContent>
          <MainMenu
            screen={screen}
            onScreenChange={(value) => ReduxStore.dispatch(SharedStore.slice.actions.setScreen(value))}
          />
          {screen === EScreen.Instances && <Instances />}
          {screen === EScreen.Values && <Values />}
          {screen === EScreen.Workflows && <Workflows />}
          {screen === EScreen.GraphQL && <Graphiql />}
        </StyledContent>
      </ReduxProvider>
    </ErrorBoundary>
  );
}
