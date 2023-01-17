import { useState } from 'react';

import { OrderType, useMakeOrder } from '../../hooks';
import { Product } from './checkout.types';

export interface Props {
  product: Product;
  onClose: () => void;
  orderType: OrderType;
}

const MakeOrder: React.FC<Props> = ({ product, onClose, orderType }) => {
  const [amount, setAmount] = useState(product.variant.lowestAsk.amount || 1);

  const { handleSubmit, isLoading } = useMakeOrder(
    product.variant.id,
    orderType,
    onClose,
  );

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
            onChange={e => setAmount(parseInt(e.target.value || '0'))}
            className="form-control"
          />
          {!amount && (
            <p className="error-message">Amount must be more than 0.</p>
          )}
        </div>
      </div>
      <div className="heading">
        <p>You will {orderType === OrderType.ASK ? 'get' : 'pay'}</p>
        <div className="subtotal">{amount}</div>
      </div>
      <button
        className="btn-main lead mb-5"
        disabled={!amount || isLoading}
        onClick={() => handleSubmit(amount)}>
        Checkout
      </button>
    </div>
  );
};

export default MakeOrder;
