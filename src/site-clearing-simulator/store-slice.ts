import { createSlice } from "@reduxjs/toolkit";

export type SiteCellType = "o" | "t" | "r" | "T" | "B" | "C";

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
  bulldozerPosition: {
    x: number;
    y: number;
  };
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

const siteClearingSimulatorSlice = createSlice({
  name: "siteClearingSimulator",
  initialState,
  reducers: {
    startSimulation(state, action) {},
    stopSimulation() {},
    moveForward(state) {
      return state;
    },
    rotateLeft(state) {
      return state;
    },
    rotateRight(state) {
      return state;
    },
    setMap(state, action) {
      return state;
    },
  },
});

export const {
  startSimulation,
  stopSimulation,
  moveForward,
  rotateLeft,
  rotateRight,
  setMap,
} = siteClearingSimulatorSlice.actions;

export default siteClearingSimulatorSlice.reducer;
