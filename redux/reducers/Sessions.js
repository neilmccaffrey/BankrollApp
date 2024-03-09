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
      stake: '',
      game: '',
      location: '',
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
      //update session
      state.sessions[index] = action.payload;
    },
    deleteSession: (state, action) => {
      state.sessions = state.sessions.filter(
        session => session.sessionId !== action.payload,
      );
    },
    resetToInitialState: () => {
      return initialState;
    },
  },
});

export const {addSession, updateSession, deleteSession, resetToInitialState} =
  Sessions.actions;

export default Sessions.reducer;
