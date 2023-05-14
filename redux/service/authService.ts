import { createApi } from '@reduxjs/toolkit/query/react';
import { designbookAxiosBaseQuery } from '../interceptor';

export interface IUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  country: string;
  birthdate: string;
  password?: string;
}

export interface ILoginRequest {
  email: string;
  password: string;
}
export interface IUserResponse {
  success: boolean;
  user: IUser;
  token: string;
  refreshToken: string;
}

export interface IRegisterResponse {
  success: boolean;
}

export interface GetTokenPrice {
  "hedera-hashgraph": object,
  "tether": object, 
}

export const authApi = createApi({
  baseQuery: designbookAxiosBaseQuery(),
  endpoints: (builder) => ({
    login: builder.mutation<IUserResponse, ILoginRequest>({
      query: (credentials) => ({
        url: '/users/api/v1/auth/login',
        method: 'POST',
        data: credentials,
      }),
    }),
    register: builder.mutation<IRegisterResponse, IUser>({
      query: (user) => ({
        url: '/users/api/v1/auth/registerbody',
        method: 'POST',
        data: user,
      }),
    }),
    exchange: builder.query<GetTokenPrice, void>({ 
      query: () => ({
        url: 'https://api.coingecko.com/api/v3/simple/price?ids=hedera-hashgraph,tether&vs_currencies=usd',
        method: 'GET',
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useExchangeQuery } = authApi;
