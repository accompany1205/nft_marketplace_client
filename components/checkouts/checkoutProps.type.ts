import { INftSpecs } from "../../types/nft.type";

interface OwnedProduct extends INftSpecs {
  owner: {
    username: string;
  };
}

export interface CheckoutProps {
  product: OwnedProduct;
  onClose: () => void;
  onCheckout: (payload: { bid: number; quantity: number }) => void;
}