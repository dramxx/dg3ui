import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import * as DateFns from 'date-fns';

import { useReduxActions, useReduxSelector } from '../model/hooks';
import { EScreen } from '../model/types';
import { AppState } from './types';

interface State {
  screen: EScreen;
  dateRange: Interval;
}

function getInitialState(): State {
  return {
    screen: EScreen.Instances,
    dateRange: {
      start: DateFns.subMonths(new Date(), 12),
      end: new Date(),
    },
  };
}

const slice = createSlice({
  name: '@shared',
  initialState: getInitialState(),
  reducers: {
    reset: () => getInitialState(),
    setScreen(state, action: PayloadAction<EScreen>) {
      state.screen = action.payload;
    },
    setDateRange(state, action: PayloadAction<Interval>) {
      state.dateRange = action.payload;
    },
  },
});

function useActions() {
  return useReduxActions(slice.actions);
}

function useSelector<T>(selector: (state: State) => T) {
  return useReduxSelector((state: AppState) => selector(state.shared));
}

export { slice, useActions, useSelector };
