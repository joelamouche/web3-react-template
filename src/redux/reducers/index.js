import { combineReducers } from '@reduxjs/toolkit';
import deviceMenu from './deviceMenu';

const rootReducer = combineReducers({
  detectDevice: deviceMenu
});

export default rootReducer;