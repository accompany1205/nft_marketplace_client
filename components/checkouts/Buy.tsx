import React from 'react';
import { useState } from 'react';
import { PurchaseDetails } from './purchase';

enum Tabs {
  BUY_NOW = 'Buy Now',
  PLACE_BID = 'Place Bid',
}

const tabList = [Tabs.BUY_NOW, Tabs.PLACE_BID];

type Props = {
  onClose: () => void;
  purchaseDetails: PurchaseDetails;
  setPurchaseDetails: (purchaseDetails: PurchaseDetails) => void;
};

const Buy: React.FC<Props> = ({ onClose }) => {
  const [currentTab, setCurrentTab] = useState<Tabs>(Tabs.BUY_NOW);

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
                className={currentTab === tab ? 'active' : ''}
                key={`tab-${tab}`}>
                <button onClick={() => setCurrentTab(tab)}>{tab}</button>
              </li>
            ))}
          </ul>
          <div className="de_tab_content">
            {currentTab === Tabs.BUY_NOW && (
              <div className="tab-2 onStep fadeIn">Buy now</div>
            )}
            {currentTab === Tabs.PLACE_BID && (
              <div className="tab-3 onStep fadeIn">place Bid</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Buy;
