import { useState } from 'react';
import { OrderType } from '../../../hooks';
import { Product } from '../checkout.types';
import MakeOrder from '../MakeOrder';
import { CheckoutDetails, CheckoutSteps, CheckoutType } from './Buy';
import BuyNow from './BuyNow';

interface Props {
  handleSubmit: (d: CheckoutDetails, nextStep?: CheckoutSteps) => void;
  product: Product;
}

const CheckoutDetails: React.FC<Props> = ({
  handleSubmit,
  product,
}) => {
  const [activeTab, setActiveTab] = useState(CheckoutType.BUY_NOW);

  const onSubmit = (type: CheckoutType, amount?: number, askId?: number): void => handleSubmit(
    {
      type,
      amount: amount || product.variant.lowestAsk.amount,
      askId,
    },
    CheckoutSteps.WALLET_CONNECTION,
  );

  return (
    <div className="de_tab">
      <ul className="de_nav">
        {product.variant.lowestAsk && (
          <li
            className={
              activeTab === CheckoutType.BUY_NOW ? 'active' : undefined
            }
            key={`tab-${CheckoutType.BUY_NOW}`}
          >
            <button
              type="button"
              onClick={() => setActiveTab(CheckoutType.BUY_NOW)}
            >
              {CheckoutType.BUY_NOW}
            </button>
          </li>
        )}
        <li
          className={
            activeTab === CheckoutType.PLACE_BID ? 'active' : undefined
          }
          key={`tab-${CheckoutType.PLACE_BID}`}
        >
          <button
            type="button"
            onClick={() => setActiveTab(CheckoutType.PLACE_BID)}
          >
            {CheckoutType.PLACE_BID}
          </button>
        </li>
      </ul>
      <div className="de_tab_content">
        {activeTab === CheckoutType.BUY_NOW && product.variant.lowestAsk && (
          <div className="onStep fadeIn">
            <BuyNow
              product={product}
              onSubmit={() => onSubmit(
                CheckoutType.BUY_NOW,
                product.variant.lowestAsk.amount,
                product.variant.lowestAsk.id,
              )}
            />
          </div>
        )}
        {activeTab === CheckoutType.PLACE_BID && (
          <MakeOrder
            product={product}
            onSubmit={(amount: number) => onSubmit(
              CheckoutType.PLACE_BID,
              amount,
            )}
            orderType={OrderType.BID}
          />
        )}
      </div>
    </div>
  );
};

export default CheckoutDetails;
