import { createSelector } from 'reselect';

const selectDeviceType = (state) => state.detectDevice.deviceType;

// Create a memoized selector using reselect
export const selectIsMobile = createSelector([selectDeviceType], (deviceType) => {
  return deviceType === 'mobile';
});