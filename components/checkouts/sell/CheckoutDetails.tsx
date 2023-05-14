import { useState } from 'react';

import { OrderType } from '../../../hooks';
import MakeOrder from '../MakeOrder';
import { CheckoutStepProps, CheckoutType } from './Sell';
import SellNow from './SellNow';
import { ProcessType } from '../../../hooks';

const CheckoutDetails: React.FC<CheckoutStepProps> = ({
  onNextStep,
  product,
  rate
}) => {
  const [activeTab, setActiveTab] = useState(
    product.highestBid && product.highestBid.id > 0 ? CheckoutType.SELL_NOW : CheckoutType.PLACE_ASK,
    //CheckoutType.SELL_NOW,
  );
  const disablePlaceAsk = false;
  return (
    <div className="de_tab">
      <ul className="de_nav">
        {product.highestBid && product.highestBid.id > 0 && (
          <li
            className={activeTab === CheckoutType.SELL_NOW ? 'active' : ''}
            key={`tab-${CheckoutType.SELL_NOW}`}
          >
            <button
              type="button"
              onClick={() => setActiveTab(CheckoutType.SELL_NOW)}
            >
              {CheckoutType.SELL_NOW}
            </button>
          </li>
        )}
        {product.highestBid && product.highestBid.id < 0 && (
          <li
            key={`tab-${CheckoutType.SELL_NOW}`}
          >
            <button
              type="button"
            >
              {CheckoutType.SELL_NOW}
            </button>
          </li>
        )}
        {!disablePlaceAsk && (
          <li
            className={activeTab === CheckoutType.PLACE_ASK ? 'active' : ''}
            key={`tab-${CheckoutType.PLACE_ASK}`}
          >
            <button
              type="button"
              onClick={() => setActiveTab(CheckoutType.PLACE_ASK)}
            >
              {CheckoutType.PLACE_ASK}
            </button>
          </li>
        )}
      </ul>
      <div className="de_tab_content">
        {activeTab === CheckoutType.SELL_NOW && (
          <div className="tab-2 onStep fadeIn">
            {product.highestBid?.id ? (
              <SellNow
                product={product}
                rate={rate}
                onSubmit={() => product?.highestBid && onNextStep(product.highestBid.amount, ProcessType.NOW)}
              />
            ) : (
              <div>
                <div className="heading">
                  <h3>No Bids yet!</h3>
                </div>
                <p>
                  Please wait till some buyer makes a bid to sell.
                </p>
              </div>
            )}
          </div>
        )}
        {activeTab === CheckoutType.PLACE_ASK && (
          <MakeOrder
            product={product}
            rate={rate}
            onSubmit={onNextStep}
            orderType={OrderType.ASK}
          />
        )}
      </div>
    </div>
  );
};

export default CheckoutDetails;
