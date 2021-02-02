import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { siteClearingSimulatorReducer } from '../site-clearing-simulator';

const rootReducer = combineReducers({
  siteClearingSimulator: siteClearingSimulatorReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type { GlobalState } from './global-state';

