import { createApi } from '@reduxjs/toolkit/query/react';
import { designbookAxiosBaseQuery } from '../interceptor';

import {
  Bid,
  BidPayload,
  BidResponse,
  Deal,
  GetTransactionPayload,
  INFT,
  INFTItem,
} from '../../types';

const appSlice = createApi({
  reducerPath: 'app',
  baseQuery: designbookAxiosBaseQuery(),
  endpoints: (builder) => ({
    getProducts: builder.query<{ data: INFTItem[] }, void>({
      query: () => ({
        url: '/marketplace/api/v1/listings',
        method: 'GET',
      }),
    }),
    getProductDetails: builder.query<{ data: INFT }, string>({
      query: (productName: string) => ({
        url: `/marketplace/api/v1/listing?productName=${productName}`,
        method: 'GET',
      }),
    }),
    makeBid: builder.mutation<BidResponse, BidPayload>({
      query: (bid) => ({
        url: '/marketplace/api/v1/bid/new',
        method: 'POST',
        data: bid,
      }),
    }),
    makeAsk: builder.mutation<BidResponse, BidPayload>({
      query: (bid) => ({
        url: '/marketplace/api/v1/ask/new',
        method: 'POST',
        data: bid,
      }),
    }),
    getBids: builder.query<{ data: Bid[] }, number>({
      query: (listingId) => ({
        url: `/marketplace/api/v1/listing/bids?listingId=${listingId}`,
        method: 'GET',
      }),
    }),
    getAsks: builder.query<{ data: Bid[] }, number>({
      query: (listingId) => ({
        url: `/marketplace/api/v1/listing/asks?listingId=${listingId}`,
        method: 'GET',
      }),
    }),
    getLastBid: builder.query<{ data: Bid }, number>({
      query: (listingId) => ({
        url: `/marketplace/api/v1/listing/bids/last?listingId=${listingId}`,
        method: 'GET',
      }),
    }),
    getLastAsk: builder.query<{ data: Bid }, number>({
      query: (listingId) => ({
        url: `/marketplace/api/v1/listing/asks/last?listingId=${listingId}`,
        method: 'GET',
      }),
    }),
    getBuyerTransaction: builder.mutation<string, GetTransactionPayload>({
      query: (data) => ({
        url: '/marketplace/api/v1/deal/transaction/get',
        method: 'POST',
        data,
      }),
    }),
    executeBuyerTransaction: builder.mutation<{ success: boolean }, string>({
      query: (transactionBuffer) => ({
        url: '/marketplace/api/v1/deal/transaction/submit',
        method: 'POST',
        data: {
          transactionBuffer,
        },
      }),
    }),
    getDeal: builder.query<{ data: Deal }, string>({
      query: (dealId) => ({
        url: `/marketplace/api/v1/deal?dealId=${dealId}`,
        method: 'GET',
      }),
    }),
  }),
});

export default appSlice;

export const {
  useGetProductDetailsQuery,
  useGetProductsQuery,
  useMakeBidMutation,
  useMakeAskMutation,
  useGetAsksQuery,
  useGetBidsQuery,
  useGetLastAskQuery,
  useGetLastBidQuery,
  useGetBuyerTransactionMutation,
  useExecuteBuyerTransactionMutation,
  useGetDealQuery,
} = appSlice;
