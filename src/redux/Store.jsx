import { configureStore } from '@reduxjs/toolkit';
import { registerUserApi } from './RegisterApi';
// import { registerUserApi } from './redux/RegisterApi';

const store = configureStore({
  reducer: {
    [registerUserApi.reducerPath]: registerUserApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(registerUserApi.middleware),
});

export default store;
