// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/index';

const store = configureStore({
  reducer: rootReducer,
});

export default store;


export type RootState = ReturnType<typeof store.getState>;