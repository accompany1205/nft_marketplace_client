import React, { useState } from 'react';
import { SellNow } from '.';
import { OrderType } from '../../../hooks';
import { Product } from '../checkout.types';
import MakeOrder from '../MakeOrder';

type Props = {
  onClose: () => void;
  product: Product;
};

enum Tabs {
  SELL_NOW = 'Sell Now',
  PLACE_ASK = 'Place ASK',
}

const tabList = [Tabs.SELL_NOW, Tabs.PLACE_ASK];

const Sell: React.FC<Props> = ({ onClose, product }) => {
  const [activeTab, setActiveTab] = useState(Tabs.SELL_NOW);

  return (
    <div className="checkout Sell">
      <div className="maincheckout">
        <button className="btn-close" type="button" onClick={onClose}>
          x
        </button>
        <div className="de_tab">
          <ul className="de_nav">
            {tabList.map((tab) => (
              <li
                className={activeTab === tab ? 'active' : ''}
                key={`tab-${tab}`}
              >
                <button type="button" onClick={() => setActiveTab(tab)}>
                  {tab}
                </button>
              </li>
            ))}
          </ul>
          <div className="de_tab_content">
            {activeTab === Tabs.SELL_NOW && (
              <div className="tab-2 onStep fadeIn">
                <SellNow product={product} onClose={onClose} />
              </div>
            )}
            {activeTab === Tabs.PLACE_ASK && (
              <MakeOrder
                product={product}
                onClose={onClose}
                orderType={OrderType.ASK}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sell;
