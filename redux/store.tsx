import { configureStore } from "@reduxjs/toolkit";
import appSlice from './service/appService'

export const store = configureStore({
  reducer:{
    [appSlice.reducerPath]: appSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat(appSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch