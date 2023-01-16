import React, { useState } from 'react';
import { CheckoutProps } from './checkoutProps.type';

const BidCheckout: React.FC<CheckoutProps> = ({
  product,
  onClose,
  onCheckout,
  orderType,
}) => {
  const [bid, setBid] = useState(parseFloat(product.price));
  const [quantity, setQuantity] = useState(1);
  return (
    <div className="checkout">
      <div className="maincheckout">
        <button type="button" className="btn-close" onClick={() => onClose()}>
          x
        </button>
        <div className="heading">
          <h3>
            Place a
            {orderType}
          </h3>
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
            {product.owner.username}
          </span>
        </p>
        <div className="detailcheckout mt-4">
          <div className="listcheckout">
            <h6>Your bid</h6>
            <input
              type="number"
              value={bid}
              onChange={(e) => setBid(parseFloat(e.target.value))}
              className="form-control"
            />
          </div>
        </div>
        <div className="detailcheckout mt-3">
          <div className="listcheckout">
            <h6>
              Enter quantity.
              <span className="color">10 available</span>
            </h6>
            <input
              type="number"
              name="buy_now_qty"
              id="buy_now_qty"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
              className="form-control"
            />
          </div>
        </div>
        <div className="heading">
          <p>You will pay</p>
          <div className="subtotal">{bid * quantity}</div>
        </div>
        <button
          type="button"
          className="btn-main lead mb-5"
          onClick={() => onCheckout({ bid, quantity })}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default BidCheckout;
