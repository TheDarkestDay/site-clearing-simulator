import { createSlice } from "@reduxjs/toolkit";
import { dir } from 'console';
import { EventsLogEntry } from './events-log-entry';
import { LogEntryType } from './log-entry-type';

export type SiteCellType = "o" | "t" | "r" | "T" | "B" | "C";

export type Point2D = {
  x: number;
  y: number;
}

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

const getNextPoint = ({ x, y }: Point2D, direction: BulldozerDirection): Point2D => {
  switch (direction) {
    case BulldozerDirection.Up:
      return {
        x: x - 1,
        y,
      }
    case BulldozerDirection.Right:
      return {
        x,
        y: y + 1,
      }
    case BulldozerDirection.Down:
      return {
        x: x + 1,
        y
      }
    case BulldozerDirection.Left:
      return {
        x,
        y: y - 1
      }
  }
};

const getNextDirection = (direction: BulldozerDirection, turnDirection: 'left' | 'right'): BulldozerDirection => {
  const directions = [
    BulldozerDirection.Up,
    BulldozerDirection.Right,
    BulldozerDirection.Down,
    BulldozerDirection.Left,
  ];

  const directionDelta = turnDirection === 'right' ? 1 : -1;
  const newDirectionIndex = directions.indexOf(direction) + directionDelta;

  if (newDirectionIndex < 0) {
    return BulldozerDirection.Left;
  }

  if (newDirectionIndex >= directions.length) {
    return BulldozerDirection.Up;
  }

  return directions[newDirectionIndex];
}

const getCellClearingFuelCost = (cellType: SiteCellType): number => {
  switch (cellType) {
    case 'o':
    case 'C':
      return 1;
    case 'r':
    case 't':
      return 2;
    default:
      throw new Error('Clearing of a cell with bulldozer or preservable tree is not allowed');
  }
};

const isPointOutOfBounds = ({x, y}: Point2D, map: SiteCellType[][]): boolean => {
  const [firstRow] = map;
  const maxX = map.length;
  const maxY = firstRow.length;

  return x < 0 || x >= maxX || y < 0 || y >= maxY; 
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

      const isThereAnyLandToClear = state.map
        .reduce((total, row) => total.concat(row), [])
        .some((cell) => cell === 'o' || cell === 'r' || cell === 't');

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
