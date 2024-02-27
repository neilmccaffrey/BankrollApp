import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  sessions: [
    {
      result: 0,
      sessionId: null,
      gameType: '',
      date: '',
      hours: '',
      minutes: '',
    },
  ],
};

export const Sessions = createSlice({
  name: 'session',
  initialState: initialState,

  reducers: {
    addSession: (state, action) => {
      //state.sessions.push(action.payload);
      //return sesssion added followed by state so last session added is first in list
      return {
        ...state,
        sessions: [action.payload, ...state.sessions],
      };
    },
    resetToInitialState: () => {
      return initialState;
    },
  },
});

export const {addSession, resetToInitialState} = Sessions.actions;

export default Sessions.reducer;
