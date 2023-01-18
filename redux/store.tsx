import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import appSlice from './service/appService';
import toastSlice from './slices/layoutSlice';
import authReducer from './slices/authSlice';
import { authApi } from './service/authService';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['auth'],
};

// not save the error and loading state on refresh
const authPersistConfig = {
  key: 'authentication',
  storage,
  whitelist: ['user', 'token', 'refreshToken'],
};

const rootReducer = combineReducers({
  [appSlice.reducerPath]: appSlice.reducer,
  [authApi.reducerPath]: authApi.reducer,
  auth: persistReducer(authPersistConfig, authReducer),
  toast: toastSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({})
    .concat(appSlice.middleware)
    .concat(authApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
