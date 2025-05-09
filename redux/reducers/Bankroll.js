import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  bankrollAmount: 0,
};

export const Bankroll = createSlice({
  name: 'bankroll',
  initialState: initialState,

  reducers: {
    bankrollWithdrawal: (state, action) => {
      state.bankrollAmount -= action.payload;
    },
    bankrollDeposit: (state, action) => {
      state.bankrollAmount += action.payload;
    },
    updateBankroll: (state, action) => {
      state.bankrollAmount += action.payload;
    },
    resetToInitialStateBankroll: () => {
      return initialState;
    },
  },
});

export const {
  updateBankroll,
  bankrollDeposit,
  bankrollWithdrawal,
  resetToInitialStateBankroll,
} = Bankroll.actions;

export default Bankroll.reducer;
