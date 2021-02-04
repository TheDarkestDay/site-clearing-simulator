import { SiteClearingSimulatorState, BulldozerDirection } from './store-slice';

export const getTestState = (
  overrides: Partial<SiteClearingSimulatorState> = {}
): SiteClearingSimulatorState => {
  return {
    map: [],
    isStarted: false,
    bulldozerDirection: BulldozerDirection.Right,
    stopReason: "",
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