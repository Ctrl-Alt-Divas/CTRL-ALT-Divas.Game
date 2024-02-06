import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  score: sessionStorage.getItem('score') === null ? '' : JSON.parse(sessionStorage.getItem('score')),
  leaderboards: sessionStorage.getItem('leaderboards') === null ? '' : JSON.parse(sessionStorage.getItem('leaderboards')),
};

const slice = createSlice({
  name: 'slice',
  initialState,
  reducers: {
    updateScore: (state, { payload }) => {
      state.score = payload;
      sessionStorage.setItem('score', JSON.stringify(state.score));
    },
    updateLeaderboard: (state, { payload }) => {
      if (state.leaderboards) {
        state.leaderboards[payload.tag] = payload.data;
        sessionStorage.setItem('leaderboards', JSON.stringify(state.leaderboards));
      } else {
        state.leaderboards = {};
        state.leaderboards[payload.tag] = payload.data;
        sessionStorage.setItem('leaderboards', JSON.stringify(state.leaderboards));
      }
    },
  },
});

export const { updateScore, updateLeaderboard } = slice.actions;

export default slice.reducer;
