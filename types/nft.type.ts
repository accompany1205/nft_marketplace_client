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
  // first_name: string;
  // last_name: string;
}

export interface INFTVariant {
  id?: number;
  size?: string;
  colour?: string;
  hederaTokenId?: string;
  serialNumber?: number;
  lowestAsk?: LiteBid;
  highestBid?: LiteBid;
}
export interface INFT1 {
  id: number;
  hed: string;
  saleStatus: string;
  specs: INftSpecs;
  ipfs: string;
  variants: INFTVariant[];
}

export interface BidResponse {
  id: number,
  amount: number,
  pool_id: number,
  user_id: number
}

export interface AskResponse {
  id: number,
  amount: number,
  pool_id: number,
  user_id: number,
  nft_id: string,
  serial_id: string,
}

export interface INFT {
  id: number;
  name: string;
  productName: string;
  serialNumber: string;
  saleStatus: string;
  specs: INftSpecs;
  ipfs: string;
  variants: number[];
  types: any[] | null;
  bids: BidResponse[],
  asks: AskResponse[],
}



export interface INFTItem {
  brand: string;
  products: INFT[];
}

export interface IPOOL {
  id: number,
  type: string,
  ipfs: string,
  productName: string,
  price: number | null
}

export interface BidPayload {
  pool_id: number;
  processing_type: string;
  user_id: number;
  amount: number;
}

export interface AskPayload {
  pool_id: number;
  processing_type: string;
  nft_id: string;
  serial_id: string;
  user_id: number;
  amount: number;
}

export interface BidResponse1 {
  success: boolean;
  data?: LiteDeal;
}

export interface Bid1 {
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

export interface Bid {
  num: number;
  amount: number;
}

export enum DealType {
  BUY = 'buy',
  SELL = 'sell',
}

export interface LiteDeal {
  id: number;
  listing_id: number;
  amount: number;
  status: 'pending' | 'confirmed' | 'money_pulled' | 'nft_pulled' | 'completed';
  datetime_created: string;
}

export interface Deal extends Partial<LiteDeal> {
  nft_data: INftSpecs;
  ipfs: string;
  is_money_pulled?: boolean;
  is_nft_pulled?: boolean;
}

export interface GetTransactionPayload {
  accountId: string;
  dealId: number;
  userId: number;
}

export interface GetNftOwnerPayload {
  hederaTokenId: string;
  serialNumber: number;
}
