import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  scrollY: 0,
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setScrollY: (state, action) => {
      state.scrollY = action.payload;
    },
  },
});

export const { setScrollY } = menuSlice.actions;
export default menuSlice.reducer;
