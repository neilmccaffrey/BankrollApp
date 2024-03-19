import {createSlice} from '@reduxjs/toolkit';

const initialState = ['1/2', '1/3', '2/5', '5/10', '10/20', '20/40'];

const Stakes = createSlice({
  name: 'stakes',
  initialState: initialState,

  reducers: {
    deleteStake: (state, action) => {
      return state.filter(item => item !== action.payload);
    },
    addStake: (state, action) => {
      return [...state, action.payload];
    },
    resetToInitialStateStakes: () => {
      return initialState;
    },
  },
});

export const {addStake, deleteStake, resetToInitialStateStakes} =
  Stakes.actions;
export default Stakes.reducer;
