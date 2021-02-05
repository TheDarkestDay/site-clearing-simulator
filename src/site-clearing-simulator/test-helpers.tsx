import { createStore } from '@reduxjs/toolkit';
import { create } from 'react-test-renderer';
import React from 'react';
import { Provider } from 'react-redux';
import { GlobalState, rootReducer } from '../store';
import { SiteClearingSimulatorState, BulldozerDirection, initialState } from './store/store-slice';

export const getTestState = (
  overrides: Partial<SiteClearingSimulatorState> = {}
): SiteClearingSimulatorState => {
  return {
    map: [],
    isStarted: false,
    isStopped: false,
    bulldozerDirection: BulldozerDirection.Right,
    bulldozerPosition: {
      x: 0,
      y: -1,
    },
    isPreservedTreeRemoved: false,
    fuelUsed: 0,
    eventsLog: [],
    ...overrides,
  };
};

export const renderWithStore = (component: React.ReactNode, state: Partial<GlobalState['siteClearingSimulator']> = {}) => {
  const testStore = createStore(rootReducer, {
    siteClearingSimulator: {
      ...initialState,
      ...state,
    }
  });
  const consumer = (
    <Provider store={testStore}>
      {component}
    </Provider>
  );

  return create(consumer);
}