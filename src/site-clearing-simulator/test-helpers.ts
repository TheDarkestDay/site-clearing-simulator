import { SiteClearingSimulatorState, BulldozerDirection } from './store/store-slice';

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