import { createSlice } from '@reduxjs/toolkit';

// Define a Redux slice for app state
const detectDeviceType = createSlice({
  name: "detectDevice",
  initialState: {
    deviceType: "laptop",
    // ... other app state properties
  },
  reducers: {
    updateDeviceType: (state, action) => {
      state.deviceType = action.payload;
    },
    // ... other reducer functions for your app state
  },
});

export const { updateDeviceType } = detectDeviceType.actions;

export default detectDeviceType.reducer;