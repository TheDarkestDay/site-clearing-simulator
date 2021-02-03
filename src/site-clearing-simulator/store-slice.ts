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
  isStopped: boolean;
  isPreservedTreeRemoved: boolean;
  bulldozerPosition: Point2D;
  bulldozerDirection: BulldozerDirection;
  fuelUsed: number;
};

// ["o", "o", "t", "o", "o", "o", "o", "o", "o", "o"],
//     ["o", "o", "o", "o", "o", "o", "o", "T", "o", "o"],
//     ["r", "r", "r", "o", "o", "o", "t", "T", "o", "o"],
//     ["r", "r", "r", "r", "o", "o", "o", "o", "o", "o"],
//     ["r", "r", "r", "r", "r", "t", "o", "o", "o", "o"]

const initialState: SiteClearingSimulatorState = {
  map: [],
  isStarted: false,
  isStopped: false,
  bulldozerDirection: BulldozerDirection.Right,
  bulldozerPosition: {
    x: -1,
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
      state.isStopped = true;
    },
    moveForward(state) {
      const {bulldozerPosition, bulldozerDirection} = state;
      const {x, y} = getNextPoint(bulldozerPosition, bulldozerDirection);

      state.map[x][y] = 'B';
      state.bulldozerPosition.x = x;
      state.bulldozerPosition.y = y; 
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
