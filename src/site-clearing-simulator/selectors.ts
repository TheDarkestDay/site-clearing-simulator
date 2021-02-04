import { createSelector } from '@reduxjs/toolkit';
import { GlobalState } from '../store';

export const getSiteMap = (state: GlobalState) => state.siteClearingSimulator.map;

export const isSimulationStarted = (state: GlobalState) => state.siteClearingSimulator.isStarted;

export const isSimulationStopped = (state: GlobalState) => state.siteClearingSimulator.stopReason !== '';

export const isBulldozerOnStartingPosition = (state: GlobalState) => {
  const {siteClearingSimulator: { bulldozerPosition: {x, y} }} = state;

  return x === 0 && y === -1;
};

const FUEL_COST = 1;

export const getFuelCost = (state: GlobalState) => state.siteClearingSimulator.fuelUsed * FUEL_COST;

const UNCLEARED_CELL_COST = 3;

export const getUnclearedCellsCost = (state: GlobalState) => {
  const unclearedCellsCount = state.siteClearingSimulator.map
    .reduce((total, row) => total.concat(row), [])
    .filter((cell) => cell === 'r' || cell === 't' || cell === 'o')
    .length;
  
  return unclearedCellsCount * UNCLEARED_CELL_COST;
};

export const getTotalExpenses = createSelector(
  getFuelCost,
  getUnclearedCellsCost,
  (fuelCost, unclearedCellsCost) => fuelCost + unclearedCellsCost 
);

export const getEvents = (state: GlobalState) => state.siteClearingSimulator.eventsLog;