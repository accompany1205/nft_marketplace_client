import { useState } from 'react';

import { OrderType } from '../../../hooks';
import MakeOrder from '../MakeOrder';
import { CheckoutStepProps, CheckoutType } from './Buy';
import BuyNow from './BuyNow';
import { ProcessType } from '../../../hooks';

const CheckoutDetails: React.FC<CheckoutStepProps> = ({
  onNextStep,
  product,
  rate,
  balance,
}) => {
  const [activeTab, setActiveTab] = useState(
    product.lowestAsk && product.lowestAsk.id > 0 ? CheckoutType.BUY_NOW : CheckoutType.PLACE_BID,
  );
  // const disableBuyNow = true;
  console.log("product.lowestAsk: ", product.lowestAsk);
  return (
    <div className="de_tab">
      <ul className="de_nav">
        {product.lowestAsk && product.lowestAsk.id > 0 && (
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
        {product.lowestAsk && product.lowestAsk.id < 0 && (
          <li
            key={`tab-${CheckoutType.BUY_NOW}`}
          >
            <button
              type="button"
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
        {activeTab === CheckoutType.BUY_NOW && (
          <div className="onStep fadeIn">
            <BuyNow
              product={product}
              rate={rate}
              onSubmit={() => product?.lowestAsk && onNextStep(product.lowestAsk.amount, 0, ProcessType.NOW)}
            />
          </div>
        )}
        {activeTab === CheckoutType.PLACE_BID && (
          <MakeOrder
            product={product}
            onSubmit={onNextStep}
            rate={rate}
            orderType={OrderType.BID}
          />
        )}
      </div>
    </div>
  );
};

export default CheckoutDetails;
