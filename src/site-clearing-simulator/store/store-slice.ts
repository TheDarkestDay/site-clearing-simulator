import { createSlice } from "@reduxjs/toolkit";
import { EventsLogEntry } from './events-log-entry';
import { getCellClearingFuelCost } from './get-cell-clearing-fuel-cost';
import { getNextDirection } from './get-next-direction';
import { getNextPoint } from './get-next-point';
import { getUnclearedCells } from './get-uncleared-cells';
import { isPointOutOfBounds } from './is-point-out-of-bounds';
import { LogEntryType } from './log-entry-type';
import { Point2D } from './point-2d';

export type SiteCellType = "o" | "t" | "r" | "T" | "B" | "C";

export enum BulldozerDirection {
  Up = 'UP',

  Right = 'RIGHT',

  Down = 'DOWN',

  Left = 'LEFT',
}

export type SiteClearingSimulatorState = {
  map: SiteCellType[][];
  isStarted: boolean;
  isStopped: boolean;
  isPreservedTreeRemoved: boolean;
  bulldozerPosition: Point2D;
  bulldozerDirection: BulldozerDirection;
  fuelUsed: number;
  eventsLog: EventsLogEntry[];
};

export const initialState: SiteClearingSimulatorState = {
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
};

const siteClearingSimulatorSlice = createSlice({
  name: "siteClearingSimulator",
  initialState,
  reducers: {
    startSimulation(_, action) {
      return {
        ...initialState,
        map: action.payload,
        isStarted: true,
      }
    },
    resetSimulation() {
      return initialState;
    },
    stopSimulation(state) {
      state.isStopped = true;

      state.eventsLog.push({
        type: LogEntryType.Stop,
        description: 'Simulation was stopped by the user'
      });
    },
    moveForward(state) {
      const {bulldozerPosition, bulldozerDirection} = state;
      const nextPoint = getNextPoint(bulldozerPosition, bulldozerDirection);

      if (isPointOutOfBounds(nextPoint, state.map)) {
        state.isStopped = true;
        state.eventsLog.push({
          type: LogEntryType.Stop,
          description: 'Simulation stopped: bulldozer left the site boundaries'
        });

        return state;
      }

      const {x: nextX, y: nextY} = nextPoint;
      const cellToClear = state.map[nextX][nextY];
      if (cellToClear === 'T') {
        state.isPreservedTreeRemoved = true;
        state.isStopped = true;

        state.eventsLog.push({
          type: LogEntryType.Stop,
          description: 'Simulation stopped: an attempt to remove preservable tree was performed'
        });

        return state;
      }

      state.fuelUsed += getCellClearingFuelCost(cellToClear);

      const {x: previousX, y: previousY} = bulldozerPosition;
      state.map[previousX][previousY] = 'C';

      state.map[nextX][nextY] = 'B';
      state.bulldozerPosition.x = nextX;
      state.bulldozerPosition.y = nextY; 

      state.eventsLog.push({
        type: LogEntryType.MoveTo,
        description: `Move to ${nextX}-${nextY}`
      });

      const isThereAnyLandToClear = getUnclearedCells(state.map).length > 0;

      if (!isThereAnyLandToClear) {
        state.isStopped = true;

        state.eventsLog.push({
          type: LogEntryType.Stop,
          description: 'Simulation stopped: there are no more fields to clear'
        });
      }
    },
    rotateLeft(state) {
      state.bulldozerDirection = getNextDirection(state.bulldozerDirection, 'left');

      state.eventsLog.push({
        type: LogEntryType.RotateLeft,
        description: 'Rotate left',
      });
    },
    rotateRight(state) {
      state.bulldozerDirection = getNextDirection(state.bulldozerDirection, 'right');;

      state.eventsLog.push({
        type: LogEntryType.RotateRight,
        description: 'Rotate right',
      });
    },
  },
});

export const {
  startSimulation,
  resetSimulation,
  stopSimulation,
  moveForward,
  rotateLeft,
  rotateRight,
} = siteClearingSimulatorSlice.actions;

export default siteClearingSimulatorSlice.reducer;
