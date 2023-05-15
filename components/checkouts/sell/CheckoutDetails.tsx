import { useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import { OrderType } from '../../../hooks';
import MakeOrder from '../MakeOrder';
import { CheckoutStepProps, CheckoutType } from './Sell';
import SellNow from './SellNow';
import { ProcessType } from '../../../hooks';
import WalletContext from '../../../services/WalletService/WalletContext';
import { showToast } from '../../../redux/slices/layoutSlice';
import WalletConnector from '../../WalletConnector';

const CheckoutDetails: React.FC<CheckoutStepProps> = ({
  onNextStep,
  product,
  rate
}) => {

  const { accountId} = useContext(WalletContext);
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState(
    product.highestBid && product.highestBid.id > 0 ? CheckoutType.SELL_NOW : CheckoutType.PLACE_ASK,
    //CheckoutType.SELL_NOW,
  );
  const disablePlaceAsk = false;
  const [showWalletConnectionModal, setShowWalletConnectionModal] = useState<boolean>(false);

  const nftOwnership = async (amount: number, type: ProcessType) => {
    if (!accountId) {
      dispatch(showToast({
        message: 'Please connect wallet.',
        type: 'danger',
      }),)
      setShowWalletConnectionModal(true);
      return;
    }

    const response =
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_PATH}/marketplace/api/v1/nft/getSerialId`,
        {
          userAccountId: accountId,
          NFTTokenId: product.nftTokenId,
          serialIds: product.variants
        }
      );
    console.log("place ask: getserialId: ", response.data);
    if (response?.data?.data?.serialId < 0) {
      dispatch(showToast({
        message: 'You have no NFT here!',
        type: 'danger',
      }),)
      return;
    }
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_PATH}/marketplace/api/v1/nft/getRoyalty`, {
      serialNumber: response?.data?.data?.serialId,
      poolId: product.id
    })
    console.log("royalty: ", res.data);
    onNextStep(amount, res?.data?.data?.royalty, ProcessType.NOW);
  }

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
                onSubmit={() => product?.highestBid && nftOwnership(product.highestBid.amount, ProcessType.NOW)}
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
      <WalletConnector
          showModal={showWalletConnectionModal}
          setShowModal={setShowWalletConnectionModal}
        />
    </div>
  );
};

export default CheckoutDetails;
