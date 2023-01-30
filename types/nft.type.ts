export interface INftSpecs {
  brand: string;
  coRoyalty: number;
  collectionName: string;
  colour: string;
  country: string;
  description: string;
  editions: number;
  material: string;
  nftType: string;
  otherSpecs: string;
  perks: any[];
  price: string;
  productName: string;
  releaseDate: string;
  royalty: number;
  rrp: string;
  serialNumber: string;
  size: string;
  sku: string;
  vrCompliant: boolean;
  avatar: string;
  priceover: string;
  url: string;
  views: number;
  likes: number;
}

export interface LiteBid {
  id: number;
  amount: number;
  first_name: string;
  last_name: string;
}

export interface INFTVariant {
  id: number;
  size: string;
  colour: string;
  hederaTokenId: string;
  serialNumber: number;
  lowestAsk?: LiteBid;
  highestBid?: LiteBid;
}
export interface INFT {
  id: number;
  hed: string;
  saleStatus: string;
  specs: INftSpecs;
  ipfs: string;
  variants: INFTVariant[];
}

export interface INFTItem {
  brand: string;
  products: INFT[];
}

export interface BidPayload {
  listing_id: number;
  user_id: number;
  amount: number;
}

export interface BidResponse {
  success: boolean;
  data?: LiteDeal;
}

export interface Bid {
  id: number;
  user_id: number;
  amount: number;
  listing_id: number;
  datetime_created: string;
  first_name: string;
  last_name: string;
  size: number;
  colour: string;
}

export enum DealType {
  BUY = 'buy',
  SELL = 'sell',
}

export interface LiteDeal {
  id: number;
  listing_id: number;
  amount: number;
  status: string;
  datetime_created: string;
}

export interface Deal extends Partial<LiteDeal> {
  nft_data: INftSpecs;
  hedera_token_id: string;
  ipfs: string;
}
