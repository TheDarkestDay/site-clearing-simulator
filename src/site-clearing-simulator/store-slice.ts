import { createSlice } from '@reduxjs/toolkit';

export type SiteCellType = 'o' | 't' | 'r' | 'T';

export type SiteClearingSimulatorState = {
  map: SiteCellType[][];
};

const initialState: SiteClearingSimulatorState = {
  map: [
    ['o', 'o', 't', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
    ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'T', 'o', 'o'],
    ['r', 'r', 'r', 'o', 'o', 'o', 't', 'T', 'o', 'o'],
    ['r', 'r', 'r', 'r', 'o', 'o', 'o', 'o', 'o', 'o'],
    ['r', 'r', 'r', 'r', 'r', 't', 'o', 'o', 'o', 'o']
  ]
};

const siteClearingSimulatorSlice = createSlice({
  name: 'siteClearingSimulator',
  initialState,
  reducers: {

  }
});

export default siteClearingSimulatorSlice.reducer;