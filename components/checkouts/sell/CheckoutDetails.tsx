import { useState } from 'react';

import { OrderType } from '../../../hooks';
import MakeOrder from '../MakeOrder';
import { CheckoutStepProps, CheckoutType } from './Sell';
import SellNow from './SellNow';

const CheckoutDetails: React.FC<CheckoutStepProps> = ({
  onNextStep,
  product,
}) => {
  const [activeTab, setActiveTab] = useState(
    // product.highestBid?.id ? CheckoutType.SELL_NOW : CheckoutType.PLACE_ASK,
    CheckoutType.SELL_NOW,
  );
  const disablePlaceAsk = true;
  return (
    <div className="de_tab">
      <ul className="de_nav">
        {product.highestBid?.id && (
          <li
            className={activeTab === CheckoutType.SELL_NOW ? 'active' : ''}
            key={`tab-${CheckoutType.SELL_NOW}`}
          >
            <button type="button" onClick={() => setActiveTab(CheckoutType.SELL_NOW)}>
              {CheckoutType.SELL_NOW}
            </button>
          </li>
        )}
        {disablePlaceAsk && (
          <li
            className={activeTab === CheckoutType.PLACE_ASK ? 'active' : ''}
            key={`tab-${CheckoutType.PLACE_ASK}`}
          >
            <button type="button" onClick={() => setActiveTab(CheckoutType.PLACE_ASK)}>
              {CheckoutType.PLACE_ASK}
            </button>
          </li>
        )}
      </ul>
      <div className="de_tab_content">
        {activeTab === CheckoutType.SELL_NOW && (
          <div className="tab-2 onStep fadeIn">
            <SellNow
              product={product}
              onSubmit={() => product?.highestBid && onNextStep(product.highestBid.amount)}
            />
          </div>
        )}
        {activeTab === CheckoutType.PLACE_ASK && (
          <MakeOrder
            product={product}
            onSubmit={onNextStep}
            orderType={OrderType.ASK}
          />
        )}
      </div>
    </div>
  );
};

export default CheckoutDetails;
