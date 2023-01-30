import { useState } from 'react';

import { OrderType } from '../../../hooks';
import MakeOrder from '../MakeOrder';
import { CheckoutStepProps, CheckoutType } from './Buy';
import BuyNow from './BuyNow';

const CheckoutDetails: React.FC<CheckoutStepProps> = ({
  onNextStep,
  product,
}) => {
  const [activeTab, setActiveTab] = useState(
    product.lowestAsk?.id ? CheckoutType.BUY_NOW : CheckoutType.PLACE_BID,
  );

  return (
    <div className="de_tab">
      <ul className="de_nav">
        {product.lowestAsk?.id && (
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
        {activeTab === CheckoutType.BUY_NOW && (
          <div className="onStep fadeIn">
            <BuyNow
              product={product}
              onSubmit={() => product?.lowestAsk && onNextStep(product.lowestAsk.amount)}
            />
          </div>
        )}
        {activeTab === CheckoutType.PLACE_BID && (
          <MakeOrder
            product={product}
            onSubmit={onNextStep}
            orderType={OrderType.BID}
          />
        )}
      </div>
    </div>
  );
};

export default CheckoutDetails;
