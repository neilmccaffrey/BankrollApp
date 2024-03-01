import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  sessions: [
    {
      result: 0,
      sessionId: '1',
      gameType: '',
      date: '',
      hours: '',
      minutes: '',
      buyIn: '',
      cashOut: '',
    },
  ],
};

export const Sessions = createSlice({
  name: 'session',
  initialState: initialState,

  reducers: {
    addSession: (state, action) => {
      //return session added followed by state so last session added is first in list
      return {
        ...state,
        sessions: [action.payload, ...state.sessions],
      };
    },
    updateSession: (state, action) => {
      //find index of session to update
      const index = state.sessions.findIndex(
        session => session.sessionId === action.payload.sessionId,
      );

      //new array
      const newArray = [state.sessions];
      //change value of index in new array
      newArray[index] = action.payload;

      return {
        ...state,
        sessions: newArray,
      };
    },
    resetToInitialState: () => {
      return initialState;
    },
  },
});

export const {addSession, updateSession, resetToInitialState} =
  Sessions.actions;

export default Sessions.reducer;
