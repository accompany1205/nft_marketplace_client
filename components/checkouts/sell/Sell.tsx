import React, { useContext, useEffect, useState } from 'react';
import { SellNow } from '.';
import { OrderType } from '../../../hooks';
import WalletContext from '../../../services/WalletService/WalletContext';
import WalletConnector from '../../WalletConnector';
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

const Sell: React.FC<Props> = ({ onClose, product }) => {
  const [activeTab, setActiveTab] = useState<Tabs>(
    product.highestBid?.id ? Tabs.SELL_NOW : Tabs.PLACE_ASK,
  );
  const [showWalletConnectionModal, setShowWalletConnectionModal] = useState<boolean>(false);

  const { provider, hasNft } = useContext(WalletContext);

  const handleShowWalletConnectionModal = (show: boolean): void => {
    setShowWalletConnectionModal(show);
  };

  useEffect(() => {
    if (hasNft) hasNft('0.0.49240678', 1);

    if (!provider) {
      setShowWalletConnectionModal(true);
    } else {
      setShowWalletConnectionModal(false);
    }
  }, [provider, product]);

  return (
    <div className="checkout Sell">
      <div className="maincheckout">
        <button className="btn-close" type="button" onClick={onClose}>
          x
        </button>
        <div className="de_tab">
          <ul className="de_nav">
            {product.highestBid?.id && (
              <li
                className={activeTab === Tabs.SELL_NOW ? 'active' : ''}
                key={`tab-${Tabs.SELL_NOW}`}
              >
                <button
                  type="button"
                  onClick={() => setActiveTab(Tabs.SELL_NOW)}
                >
                  {Tabs.SELL_NOW}
                </button>
              </li>
            )}
            <li
              className={activeTab === Tabs.PLACE_ASK ? 'active' : ''}
              key={`tab-${Tabs.PLACE_ASK}`}
            >
              <button
                type="button"
                onClick={() => setActiveTab(Tabs.PLACE_ASK)}
              >
                {Tabs.PLACE_ASK}
              </button>
            </li>
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
                onSubmit={onClose}
                orderType={OrderType.ASK}
              />
            )}
            <WalletConnector
              showModal={showWalletConnectionModal}
              setShowModal={handleShowWalletConnectionModal}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sell;
