import { GlobalState } from '../store';

export const getSiteMap = (state: GlobalState) => state.siteClearingSimulator.map;

export const isSimulationStarted = (state: GlobalState) => state.siteClearingSimulator.isStarted;