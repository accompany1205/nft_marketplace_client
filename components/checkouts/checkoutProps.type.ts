import { INftSpecs } from '../../types/nft.type';

interface OwnedProduct extends INftSpecs {
  id: number;
  owner: {
    username: string
  }
}

export enum OrderType {
  "BID",
  "ASK",
}

export interface CheckoutProps {
  product: OwnedProduct;
  onClose: () => void;
  onCheckout: (payload: { bid: number; quantity: number }) => void;
}

export interface BidCheckoutProps extends CheckoutProps {
  orderType: OrderType;
}
