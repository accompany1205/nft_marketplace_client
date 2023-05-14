import React from 'react';
import { Product } from '../../../pages/product';

interface Props {
  product: Product;
  onSubmit: () => void;
  rate: number;
}

const BuyNow: React.FC<Props> = ({ product, onSubmit, rate }) => (
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
        {' aaa '}
        {/* {product.lowestAsk?.first_name} */}
        {' bbb '}
        {/* {product.lowestAsk?.last_name} */}
      </span>
    </p>
    <div>
      <b>Total :</b>
      {' '}
      {product.lowestAsk?.amount}
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
