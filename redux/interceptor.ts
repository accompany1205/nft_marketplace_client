import axios from "axios";
const MAIN_URL = process.env.NEXT_PUBLIC_API_PATH;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const instance = axios.create({ baseURL: MAIN_URL })
import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import type { AxiosRequestConfig, AxiosError } from 'axios'


instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    return Promise.reject(error);
  }
);
instance.interceptors.request.use((config) => {
  return config;
});

const methods = {
  get: instance.get,
  post: instance.post,
  put: instance.put,
  delete: instance.delete,
  patch: instance.patch,
};

export default methods;

export const axiosBaseQuery = (): BaseQueryFn<
  {
    url: string
    method: AxiosRequestConfig['method']
    data?: AxiosRequestConfig['data']
    params?: AxiosRequestConfig['params']
  },
  unknown,
  unknown
> =>
  async ({ url, method, data, params }: any) => {
    try {
      const result = await axios({
        url: MAIN_URL + url, method,

        data: {
          "x-api-key": API_KEY,
          ...data
        },


        params
      })
      return { data: result.data }
    } catch (axiosError) {
      let err = axiosError as AxiosError
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      }
    }
  }