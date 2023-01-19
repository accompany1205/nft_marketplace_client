import { useState } from 'react';

import { OrderType } from '../../hooks';
import { Product } from './checkout.types';

export interface Props {
  product: Product;
  onSubmit: (amount: number) => void;
  orderType: OrderType;
}

const MakeOrder: React.FC<Props> = ({ product, onSubmit, orderType }) => {
  const [amount, setAmount] = useState(product.variant.lowestAsk?.amount || 100);

  return (
    <div>
      <div className="heading">
        <h3>{orderType === OrderType.ASK ? 'Ask' : 'Bid'}</h3>
      </div>
      <div className="detailcheckout">
        <div className="listcheckout">
          <h6>Enter amount.</h6>
          <input
            type="number"
            name="amount"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(parseInt(e.target.value || '0', 10))}
            className="form-control"
          />
          {!amount && (
            <p className="error-message">Amount must be more than 0.</p>
          )}
        </div>
      </div>
      <div className="heading">
        <p>
          You will
          {orderType === OrderType.ASK ? 'get' : 'pay'}
        </p>
        <div className="subtotal">{amount}</div>
      </div>
      <button
        type="button"
        className="btn-main lead mb-5"
        disabled={!amount}
        onClick={() => onSubmit(amount)}
      >
        Checkout
      </button>
    </div>
  );
};

export default MakeOrder;
