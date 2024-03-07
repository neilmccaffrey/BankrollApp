import {createSlice} from '@reduxjs/toolkit';

const initialState = [
  'NL Holdem',
  'Limit Holdem',
  'PL Omaha',
  'PL Omaha 8',
  '7 Card Stud',
  '7 Card Stud 8',
];

const Games = createSlice({
  name: 'games',
  initialState: initialState,

  reducers: {
    deleteGame: (state, action) => {
      return state.filter(item => item !== action.payload);
    },
    addGame: (state, action) => {
      return [...state, action.payload];
    },
    resetToInitialState: () => {
      return initialState;
    },
  },
});

export const {addGame, deleteGame, resetToInitialState} = Games.actions;
export default Games.reducer;
