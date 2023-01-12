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
  }[];
}

export interface INFTItem {
  brand: string;
  products: INFT[];
}
