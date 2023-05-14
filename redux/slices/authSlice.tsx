import { createSlice } from '@reduxjs/toolkit';
import { authApi, IUser } from '../service/authService';
import { RootState } from '../store';

type AuthState = {
  error: string | null;
  user: IUser | null;
  token: string | null;
  refreshToken: string | null;
};

const initialState: AuthState = {
  user: null,
  token: null,
  refreshToken: null,
  error: null,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => ({
        ...state,
        token: payload.token,
        user: payload.user,
        refreshToken: payload.refreshToken,
      }),
    );
    builder.addMatcher(
      authApi.endpoints.login.matchRejected,
      (state, { payload }: { payload: any }) => {
        console.log('auth Error', payload);
        return {
          ...initialState,
          error: payload?.data?.message || 'unknown Error',
        };
      },
    );
    builder.addMatcher(
      authApi.endpoints.exchange.matchFulfilled,
      (state, { payload }) => {
        console.log('price hedera: ', payload);
        return {
          ...state,
          //exchangeRate: payload.data.["hedera-hashgraph"]["usd"]
        }
      }
    );
    builder.addMatcher(
      authApi.endpoints.exchange.matchRejected,
      (state, { payload }) => {
        console.log('price hedera: ', payload);
        return {
          ...state,
          exchangeRate: null
        }
      }
    );
  },
});

export const { reset } = slice.actions;

export default slice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;

