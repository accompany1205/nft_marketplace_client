import React from 'react';
import { useCreateDeal } from '../../../hooks';
import { DealType } from '../../../types';
import { Product } from '../checkout.types';

interface Props {
  product: Product;
  onClose: () => void;
}

const SellNow: React.FC<Props> = ({ product, onClose }) => {
  const { handleSubmit, isLoading } = useCreateDeal(product.id, onClose);

  return (
    <div>
      <div className="heading">
        <h3>Price Computation</h3>
      </div>
      <p>
        You are about to sell a
        {' '}
        <span className="bold">
          {product.productName}
          &nbsp;
        </span>
        <span className="bold">
          to
          {' '}
          {product.highestBid?.first_name}
          {' '}
          {product.highestBid?.last_name}
        </span>
      </p>
      <div>
        <b>Total :</b>
        {' '}
        {product.highestBid?.amount}
      </div>
      <button
        type="button"
        className="btn-main lead mb-5"
        disabled={isLoading}
        onClick={() => handleSubmit(DealType.SELL)}
      >
        Complete Purchase
      </button>
    </div>
  );
};

export default SellNow;
