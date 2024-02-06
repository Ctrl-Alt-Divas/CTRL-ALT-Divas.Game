import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  player: sessionStorage.getItem('player') === null ? '' : JSON.parse(sessionStorage.getItem('player')),
  leaderboards: sessionStorage.getItem('leaderboards') === null ? '' : JSON.parse(sessionStorage.getItem('leaderboards')),
  token: sessionStorage.getItem('token') === null ? '' : JSON.parse(sessionStorage.getItem('token'))
};

const slice = createSlice({
  name: 'slice',
  initialState,
  reducers: {
    updatePlayer: (state, { payload }) => {
      state.player = payload;
      sessionStorage.setItem('player', JSON.stringify(state.player));
    },
    updateLeaderboard: (state, { payload }) => {
      if (state.leaderboards) {
        state.leaderboards = payload.data;
        sessionStorage.setItem('leaderboards', JSON.stringify(state.leaderboards));
      } else {
        state.leaderboards = {};
        state.leaderboards = payload.data;
        sessionStorage.setItem('leaderboards', JSON.stringify(state.leaderboards));
      }
    },
    setCredentials: (state, action) => {
      const { player, token } = action.payload;
      state.player = player;
      state.token = token;
      sessionStorage.setItem('player', JSON.stringify(state.player));
    },
    setToken: (state, action) => {
      const { token } = action.payload;
      state.token = token;
      sessionStorage.setItem('token', JSON.stringify(state.token));
    },
  },
});

export const { updatePlayer, updateLeaderboard, setCredentials, setToken } = slice.actions;

export default slice.reducer;
