import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  player: sessionStorage.getItem('player') === null ? '' : JSON.parse(sessionStorage.getItem('player')),
  leaderboards: sessionStorage.getItem('leaderboards') === null ? '' : JSON.parse(sessionStorage.getItem('leaderboards')),
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
  },
});

export const { updatePlayer, updateLeaderboard } = slice.actions;

export default slice.reducer;
