import React from 'react';
import { useBuy } from '../../../hooks';
import { Product } from '../checkout.types';

interface Props {
  product: Product;
  onClose: () => void;
}

const BuyNow: React.FC<Props> = ({ product, onClose }) => {
  const { handleSubmit, isLoading } = useBuy(product.variant, onClose);

  return (
    <div>
      <div className="heading">
        <h3>Price Computation</h3>
      </div>
      <p>
        You are about to purchase a
        {' '}
        <span className="bold">
          {product.productName}
          &nbsp;
        </span>
        <span className="bold">
          from
          {' '}
          {product.variant.lowestAsk.first_name}
          {' '}
          {product.variant.lowestAsk.last_name}
        </span>
      </p>
      <div>
        <b>Total :</b>
        {' '}
        {product.variant.lowestAsk.amount}
      </div>
      <button
        className="btn-main lead mb-5"
        onClick={handleSubmit}
        disabled={isLoading}
      >
        Complete Purchase
      </button>
    </div>
  );
};

export default BuyNow;
