import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { designbookAxiosBaseQuery } from '../interceptor';

export interface IUser {
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
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
