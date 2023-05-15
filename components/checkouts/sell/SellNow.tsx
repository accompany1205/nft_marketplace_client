import React from 'react';
import { Product } from '../../../pages/product';

interface Props {
  product: Product;
  onSubmit: () => void;
  rate: number;
}

const SellNow: React.FC<Props> = ({ product, onSubmit, rate }) => (
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
        {product.highestBid?.amount}HBAR({Math.floor((product.highestBid?.amount || 0) * rate * 10000) / 10000}$)
        {/* {product.highestBid?.last_name} */}
      </span>
    </p>
    <div>
      <b>Total :</b>
      {' '}
      {product.highestBid?.amount}HBAR ({Math.floor((product.highestBid?.amount || 0) * rate * 10000) / 10000}$)
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
