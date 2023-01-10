import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../interceptor";

import { INFT } from "../../types/nft.type";

const appSlice = createApi({
  reducerPath: "app",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder:any) => ({
    getProducts: builder.query<{ data: INFT[] }, void>({
      query: () => ({
        url:"listings",
        method:'GET'
       })
    }),
     getProductDetails: builder.query<{ data: INFT[]}, void>({
      query: (id:any) => ({
        url:`listing?listingId=${id}`,
        method:'GET',
       })
    }),
  }),
});

export default appSlice;
