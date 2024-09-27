import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: JSON.parse(localStorage.getItem('currentUser')) || null,
};

const authorizationSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    login: (state, action) => {
      state.currentUser = action.payload;
      localStorage.setItem('currentUser', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.currentUser = null;
      localStorage.removeItem('currentUser');
    },
  },
});

export const { login, logout } = authorizationSlice.actions;
export default authorizationSlice.reducer;
