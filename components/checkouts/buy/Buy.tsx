import React, { useState } from 'react';
import { OrderType } from '../../../hooks';
import { Product } from '../checkout.types';
import MakeOrder from '../MakeOrder';
import BuyNow from './BuyNow';

enum Tabs {
  BUY_NOW = 'Buy Now',
  PLACE_BID = 'Place Bid',
}

const tabList = [Tabs.BUY_NOW, Tabs.PLACE_BID];

type Props = {
  onClose: () => void;
  product: Product;
};

const Buy: React.FC<Props> = ({ onClose, product }) => {
  const [activeTab, setActiveTab] = useState(Tabs.BUY_NOW);

  return (
    <div className="checkout">
      <div className="maincheckout">
        <button className="btn-close" type="button" onClick={onClose}>
          x
        </button>
        <div className="de_tab">
          <ul className="de_nav">
            {tabList.map(tab => (
              <li
                className={activeTab === tab ? 'active' : ''}
                key={`tab-${tab}`}>
                <button onClick={() => setActiveTab(tab)}>{tab}</button>
              </li>
            ))}
          </ul>
          <div className="de_tab_content">
            {activeTab === Tabs.BUY_NOW && (
              <div className="tab-2 onStep fadeIn">
                <BuyNow product={product} onClose={onClose} />
              </div>
            )}
            {activeTab === Tabs.PLACE_BID && (
              <MakeOrder
                product={product}
                onClose={onClose}
                orderType={OrderType.BID}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Buy;
