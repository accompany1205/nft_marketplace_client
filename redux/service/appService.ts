import { createApi } from '@reduxjs/toolkit/query/react';
import { designbookAxiosBaseQuery } from '../interceptor';

import {
  Bid,
  BidPayload,
  AskPayload,
  BidResponse,
  Deal,
  GetTransactionPayload,
  GetNftOwnerPayload,
  INFT,
  //INFTItem,
  IPOOL,
} from '../../types';

const appSlice = createApi({
  reducerPath: 'app',
  baseQuery: designbookAxiosBaseQuery(),
  tagTypes: ['bid', 'ask'],
  endpoints: (builder) => ({
    getProducts: builder.query<{ data: IPOOL[] }, void>({ // INFTItem[]
      query: () => ({
        url: '/marketplace/api/v1/listings',
        method: 'GET',
      }),
    }),
    getProductDetails: builder.query<{ data: INFT }, object>({
      query: (params) => ({
        url: `/marketplace/api/v1/listing`,
        method: 'POST',
        data: params
      }),
      providesTags: ['bid', 'ask'],
    }),
    makeBid: builder.mutation<BidResponse, BidPayload>({
      query: (bid) => ({
        url: '/marketplace/api/v1/bid/new',
        method: 'POST',
        data: bid,
      }),
      invalidatesTags: ['bid'],
    }),
    makeAsk: builder.mutation<BidResponse, AskPayload>({
      query: (bid) => ({
        url: '/marketplace/api/v1/ask/new',
        method: 'POST',
        data: bid,
      }),
      invalidatesTags: ['ask'],
    }),
    getBids: builder.query<{ data: Bid[] }, number>({
      query: (listingId) => ({
        url: `/marketplace/api/v1/listing/bids?listingId=${listingId}`,
        method: 'GET',
      }),
      providesTags: ['bid'],
    }),
    getAsks: builder.query<{ data: Bid[] }, number>({
      query: (listingId) => ({
        url: `/marketplace/api/v1/listing/asks?listingId=${listingId}`,
        method: 'GET',
      }),
      providesTags: ['ask'],
    }),
    getLastBid: builder.query<{ data: Bid }, number>({
      query: (listingId) => ({
        url: `/marketplace/api/v1/listing/bids/last?listingId=${listingId}`,
        method: 'GET',
      }),
      providesTags: ['bid'],
    }),
    getLastAsk: builder.query<{ data: Bid }, number>({
      query: (listingId) => ({
        url: `/marketplace/api/v1/listing/asks/last?listingId=${listingId}`,
        method: 'GET',
      }),
      providesTags: ['ask'],
    }),
    getNftOwner: builder.query<{ data: string }, GetNftOwnerPayload>({
      query: ({ hederaTokenId, serialNumber }) => ({
        url: `/marketplace/api/v1/nft/owner?serialNumber=${serialNumber}&hederaTokenId=${hederaTokenId}`,
        method: 'GET',
      }),
    }),
    getBuyerTransaction: builder.mutation<string, GetTransactionPayload>({
      query: (data) => ({
        url: '/marketplace/api/v1/deal/buyer/payment/get',
        method: 'POST',
        data,
      }),
    }),
    submitBuyerTransaction: builder.mutation<{ success: boolean }, string>({
      query: (transactionBuffer) => ({
        url: '/marketplace/api/v1/deal/buyer/payment/submit',
        method: 'POST',
        data: {
          transactionBuffer,
        },
      }),
    }),
    getSellerTransaction: builder.mutation<string, GetTransactionPayload>({
      query: (data) => ({
        url: '/marketplace/api/v1/deal/seller/payment/get',
        method: 'POST',
        data,
      }),
    }),
    submitSellerTransaction: builder.mutation<{ success: boolean }, string>({
      query: (transactionBuffer) => ({
        url: '/marketplace/api/v1/deal/seller/payment/submit',
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
  useSubmitBuyerTransactionMutation,
  useGetSellerTransactionMutation,
  useSubmitSellerTransactionMutation,
  useGetDealQuery,
  useGetNftOwnerQuery,
} = appSlice;
