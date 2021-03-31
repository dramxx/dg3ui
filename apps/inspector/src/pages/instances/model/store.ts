import { InstanceType } from '@api';
import { ColumnConfig, useReduxActions, useReduxSelector } from '@model';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AppState } from '@store/types';

import { TableColumns } from '../model/table-columns';

interface State {
  selectedTypes: InstanceType[];
  tableColumns: ColumnConfig[];
}

function getInitialState(): State {
  return {
    selectedTypes: [],
    tableColumns: TableColumns,
  };
}

const slice = createSlice({
  name: '@instances',
  initialState: getInitialState(),
  reducers: {
    reset: () => getInitialState(),
    setSelectedTypes(state, action: PayloadAction<InstanceType[]>) {
      state.selectedTypes = action.payload;
    },
    setTableColumns(state, action: PayloadAction<ColumnConfig[]>) {
      state.tableColumns = action.payload;
    },
  },
});

function useActions() {
  return useReduxActions(slice.actions);
}

function useSelector<T>(selector: (state: State) => T) {
  return useReduxSelector((state: AppState) => selector(state.instances));
}

export { slice, useActions, useSelector };
