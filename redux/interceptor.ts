import axios from 'axios';
import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import type { AxiosRequestConfig, AxiosError } from 'axios';
import { RootState } from './store';

const MAIN_URL = process.env.NEXT_PUBLIC_API_PATH;

const designBookInstance = axios.create({
  baseURL: MAIN_URL,
});

// create logic for refreshtoken in interceptor

// eslint-disable-next-line import/prefer-default-export
export const designbookAxiosBaseQuery = (): BaseQueryFn<
    {
      url: string
      method: AxiosRequestConfig['method']
      data?: AxiosRequestConfig['data']
      params?: AxiosRequestConfig['params']
    },
    unknown,
    unknown
  > => async ({
  url, method, data, params,
}, { getState }) => {
  try {
    const result = await designBookInstance({
      url,
      method,
      data,
      params,
      headers: {
        'x-api-key': (getState() as RootState).auth.token,
      },
    });
    return { data: result.data };
  } catch (axiosError) {
    const err = axiosError as AxiosError;
    return {
      error: {
        status: err.response?.status,
        data: err.response?.data || err.message,
      },
    };
  }
};
