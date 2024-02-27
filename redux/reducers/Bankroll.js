import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  bankrollAmount: 0,
};

export const Bankroll = createSlice({
  name: 'bankroll',
  initialState: initialState,

  reducers: {
    updateBankroll: (state, action) => {
      state.bankrollAmount += action.payload;
    },
    resetToInitialState: () => {
      return initialState;
    },
  },
});

export const {updateBankroll, resetToInitialState} = Bankroll.actions;

export default Bankroll.reducer;
