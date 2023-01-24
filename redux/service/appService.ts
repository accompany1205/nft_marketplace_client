import { createApi } from '@reduxjs/toolkit/query/react';
import { designbookAxiosBaseQuery } from '../interceptor';

import {
  Bid,
  BidPayload,
  BidResponse,
  Deal,
  DealPayload,
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
    makeDeal: builder.mutation<{ data: Deal }, DealPayload>({
      query: (bid) => ({
        url: '/marketplace/api/v1/deal/new',
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
    createBuyerPayment: builder.mutation<Uint8Array, { accountId: string, dealId: number }>({
      query: (data) => ({
        url: '/marketplace/api/v1/deal/buyer/pay',
        method: 'POST',
        data,
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
  useMakeDealMutation,
  useCreateBuyerPaymentMutation,
} = appSlice;
