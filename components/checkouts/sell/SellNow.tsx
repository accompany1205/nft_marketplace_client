import React from 'react';
import { useSell } from '../../../hooks';
import { Product } from '../checkout.types';

interface Props {
  product: Product;
  onClose: () => void;
}

const SellNow: React.FC<Props> = ({ product, onClose }) => {
  const { handleSubmit, isLoading } = useSell(product.variant, onClose);

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
          {product.variant.highestBid.first_name}
          {' '}
          {product.variant.highestBid.last_name}
        </span>
      </p>
      <div>
        <b>Total :</b>
        {' '}
        {product.variant.highestBid.amount}
      </div>
      <button
        className="btn-main lead mb-5"
        disabled={isLoading}
        onClick={handleSubmit}
      >
        Complete Purchase
      </button>
    </div>
  );
};

export default SellNow;
