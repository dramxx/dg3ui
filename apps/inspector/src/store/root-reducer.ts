import { Store as InstancesStore } from '@pages/instances/model';
import { Store as ValuesStore } from '@pages/values/model';
import { combineReducers } from '@reduxjs/toolkit';

import * as SharedStore from './shared';

const RootReducer = combineReducers({
  shared: SharedStore.slice.reducer,
  instances: InstancesStore.slice.reducer,
  values: ValuesStore.slice.reducer,
});

export default RootReducer;
