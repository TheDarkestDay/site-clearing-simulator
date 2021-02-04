import { createSlice } from "@reduxjs/toolkit";

export type SiteCellType = "o" | "t" | "r" | "T" | "B" | "C";

export type Point2D = {
  x: number;
  y: number;
}

export enum BulldozerDirection {
  Up = 1,

  Right = 2,

  Down = 3,

  Left = 4,
}

export type SiteClearingSimulatorState = {
  map: SiteCellType[][];
  isStarted: boolean;
  stopReason: string;
  isPreservedTreeRemoved: boolean;
  bulldozerPosition: Point2D;
  bulldozerDirection: BulldozerDirection;
  fuelUsed: number;
};

const initialState: SiteClearingSimulatorState = {
  map: [],
  isStarted: false,
  stopReason: '',
  bulldozerDirection: BulldozerDirection.Right,
  bulldozerPosition: {
    x: 0,
    y: -1,
  },
  isPreservedTreeRemoved: false,
  fuelUsed: 0,
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
    stopSimulation(state) {
      state.stopReason = 'Simulation was stopped by the user';
    },
    moveForward(state) {
      const {bulldozerPosition, bulldozerDirection} = state;
      const nextPoint = getNextPoint(bulldozerPosition, bulldozerDirection);

      if (isPointOutOfBounds(nextPoint, state.map)) {
        state.stopReason = 'Bulldozer was moved out of site bounds';

        return state;
      }

      const {x: nextX, y: nextY} = nextPoint;
      const cellToClear = state.map[nextX][nextY];
      if (cellToClear === 'T') {
        state.isPreservedTreeRemoved = true;
        state.stopReason = 'An attempt to remove preservable tree was performed.';

        return state;
      }

      state.fuelUsed = getCellClearingFuelCost(cellToClear);

      const {x: previousX, y: previousY} = bulldozerPosition;
      state.map[previousX][previousY] = 'C';

      state.map[nextX][nextY] = 'B';
      state.bulldozerPosition.x = nextX;
      state.bulldozerPosition.y = nextY; 
    },
    rotateLeft(state) {
      state.bulldozerDirection -= 1;
    },
    rotateRight(state) {
      state.bulldozerDirection += 1;
    },
  },
});

export const {
  startSimulation,
  stopSimulation,
  moveForward,
  rotateLeft,
  rotateRight,
} = siteClearingSimulatorSlice.actions;

export default siteClearingSimulatorSlice.reducer;
