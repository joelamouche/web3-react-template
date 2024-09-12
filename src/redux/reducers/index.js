import { combineReducers } from '@reduxjs/toolkit';
import deviceMenu from './deviceMenu';
import menuBackground from "./menuBackground"

const rootReducer = combineReducers({
  detectDevice: deviceMenu,
  menu: menuBackground
});

export default rootReducer;