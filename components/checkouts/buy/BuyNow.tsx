import React from 'react';

import { Product } from '../checkout.types';

interface Props {
  product: Product;
  onSubmit: () => void;
}

const BuyNow: React.FC<Props> = ({ product, onSubmit }) => (
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
      type="button"
      className="btn-main lead mb-5"
      onClick={onSubmit}
    >
      Complete Purchase
    </button>
  </div>
);

export default BuyNow;
