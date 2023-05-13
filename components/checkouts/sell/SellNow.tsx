import React from 'react';
import { Product } from '../../../pages/product';

interface Props {
  product: Product;
  onSubmit: () => void;
}

const SellNow: React.FC<Props> = ({ product, onSubmit }) => (
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
        {' the Bidder of '}
        {/* {product.highestBid?.first_name} */}
        {product.highestBid?.amount}$
        {/* {product.highestBid?.last_name} */}
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
      onClick={onSubmit}
    >
      Complete Purchase
    </button>
  </div>
);

export default SellNow;
