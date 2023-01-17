import { OrderType } from '../../hooks';
import { INFTVariant } from '../../types';

export interface Product {
  id: number;
  productName: string;
  owner: {
    username: string;
  };
  variant: INFTVariant;
}

export interface MakeOrderProps {
  product: Product;
  onClose: () => void;
  orderType: OrderType;
}

export interface BuyProps {
  onClose: () => void;
  product: Product;
}

export interface BuyNowProps {
  product: Product;
  onClose: () => void;
}
