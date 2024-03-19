import {createSlice} from '@reduxjs/toolkit';

const initialState = ['Foxwoods', 'Mohegan Sun'];

const Locations = createSlice({
  name: 'locations',
  initialState: initialState,

  reducers: {
    deleteLocation: (state, action) => {
      return state.filter(item => item !== action.payload);
    },
    addLocation: (state, action) => {
      return [...state, action.payload];
    },
    resetToInitialStateLocations: () => {
      return initialState;
    },
  },
});

export const {addLocation, deleteLocation, resetToInitialStateLocations} =
  Locations.actions;
export default Locations.reducer;
