import { createApi } from "@reduxjs/toolkit/query/react";
import { designbookAxiosBaseQuery } from "../interceptor";

import { INFT } from "../../types/nft.type";

const appSlice = createApi({
  reducerPath: "app",
  baseQuery: designbookAxiosBaseQuery(),
  endpoints: (builder: any) => ({
    getProducts: builder.query<{ data: INFT[] }, void>({
      query: () => ({
        url: "/marketplace/api/v1/listings",
        method: "GET",
      }),
    }),
    getProductDetails: builder.query<{ data: INFT[] }, void>({
      query: (id: any) => ({
        url: `/marketplace/api/v1/listing?listingId=${id}`,
        method: "GET",
      }),
    }),
  }),
});

export default appSlice;
