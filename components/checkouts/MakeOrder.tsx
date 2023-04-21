import { useState } from 'react';

import { OrderType } from '../../hooks';
import { Product } from '../../pages/product/[product]';

export interface Props {
  product: Product;
  onSubmit: (amount: number) => void;
  orderType: OrderType;
}

const MakeOrder: React.FC<Props> = ({ product, onSubmit, orderType }) => {
  const [amount, setAmount] = useState(
    (orderType === OrderType.ASK
      ? product.lowestAsk?.amount
      : product.highestBid?.amount) || 100,
  );

  return (
    <div>
      <div className="heading" />
      <div className="detailcheckout">
        <div className="listcheckout">
          <h6>Enter amount</h6>
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
          You
          {orderType === OrderType.ASK ? ' are offering' : ' will pay'}
        </p>
        <div className="subtotal">
          £
          {amount}
          {' '}
          / XX HBAR
        </div>
      </div>
      <button
        type="button"
        className="btn-main lead mb-5"
        disabled={!amount}
        onClick={() => onSubmit(amount)}
      >
        Place Deal
      </button>
    </div>
  );
};

export default MakeOrder;
