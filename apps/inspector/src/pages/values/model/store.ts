import { DioValueType } from '@api';
import { useReduxActions, useReduxSelector } from '@model';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AppState } from '@store/types';

interface State {
  selectedTypes: DioValueType[];
  overviewPage: number;
}

function getInitialState(): State {
  return {
    selectedTypes: [],
    overviewPage: 0,
  };
}

const slice = createSlice({
  name: '@values',
  initialState: getInitialState(),
  reducers: {
    reset: () => getInitialState(),
    setSelectedTypes(state, action: PayloadAction<DioValueType[]>) {
      state.selectedTypes = action.payload;
    },
    setOverviewPage(state, action: PayloadAction<number>) {
      state.overviewPage = action.payload;
    },
  },
});

function useActions() {
  return useReduxActions(slice.actions);
}

function useSelector<T>(selector: (state: State) => T) {
  return useReduxSelector((state: AppState) => selector(state.values));
}

export { slice, useActions, useSelector };
