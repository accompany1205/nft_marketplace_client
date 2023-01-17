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

export interface INFT {
  hederaTokenId: string;
  id: number;
  hed: string;
  saleStatus: string;
  serial: number;
  specs: INftSpecs;
  ipfs: string;
  variants: {
    id: number;
    size: string;
    colour: string;
    lowestAsk: {
      id: number;
      amount: number;
    };
    highestBid: {
      id: number;
      amount: number;
    };
  }[];
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
  message?: string;
}

export interface Bid {
  id: number;
  user_id: number;
  amount: number;
  listing_id: number;
  datetime_created: string;
  first_name: string;
  last_name: string;
}

export interface DealPayload {
  listing_id: number;
  price_id: number;
  status: string;
}
