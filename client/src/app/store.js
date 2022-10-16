import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import userReducer from '../features/user/user-slice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer
  },
});
