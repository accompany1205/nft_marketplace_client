import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../interceptor";

import { INFT } from "../../types/nft.type";

const appSlice = createApi({
  reducerPath: "app",
  baseQuery: axiosBaseQuery({
    baseUrl: ""
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<{ data: INFT[]}, void>({
      query: () => ({
        url:"https://api.designbook.app/marketplace/api/v1/listings",
        method:'GET',
        data: { "x-api-key": "0366d7904db3beac71b5b35ed0b35912"} 
       })
    }),
  }),
});

export default appSlice;
