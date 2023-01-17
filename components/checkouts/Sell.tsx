import React, { useState } from 'react';
import { useSell } from '../../hooks';
import { PurchaseDetails } from './purchase';

enum Tabs {
  Sell_NOW = 'Sell Now',
  PLACE_ASK = 'Place Ask',
}

const tabList = [Tabs.Sell_NOW, Tabs.PLACE_ASK];

type Props = {
  onClose: () => void;
  purchaseDetails: PurchaseDetails;
  setPurchaseDetails: (purchaseDetails: PurchaseDetails) => void;
};

const Sell: React.FC<Props> = ({ onClose }) => {
  const { tabList } = useSell();
  const [currentTab, setCurrentTab] = useState(Tabs.Sell_NOW);
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
            {currentTab === Tabs.Sell_NOW && (
              <div className="tab-2 onStep fadeIn">Sell now</div>
            )}
            {currentTab === Tabs.PLACE_ASK && (
              <div className="tab-3 onStep fadeIn">Place Ask</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sell;
