import React, { useState } from 'react';
import { CheckoutProps } from './checkoutProps.type';

const Checkout: React.FC<CheckoutProps> = ({ product, onClose, onCheckout }) => {
  const price = parseFloat(product.price);
  const [quantity, setQuantity] = useState(1);
  return (
    <div className="checkout">
      <div className="maincheckout">
        <button type="button" className="btn-close" onClick={() => onClose()}>
          x
        </button>
        <div className="heading">
          <h3>Checkout</h3>
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
        <div className="heading mt-3">
          <p>You will pay</p>
          <div className="subtotal">{price * quantity}</div>
        </div>
        <button
          type="button"
          className="btn-main lead mb-5"
          onClick={() => onCheckout({
            bid: price,
            quantity,
          })}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Checkout;
