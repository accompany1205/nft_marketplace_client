import BigNumber from 'bignumber.js';
import { useContext, useEffect, useState } from 'react';
import { OrderType, useBuy, useMakeOrder } from '../../../hooks';
import WalletContext from '../../../services/WalletService/WalletContext';
import Loader from '../../Loader';
import { CheckoutStepProps, CheckoutType } from './Buy';

const Summary: React.FC<CheckoutStepProps> = ({ checkoutInformation, product, onClose }) => {
  const { accountId, getAccountBalance } = useContext(WalletContext);
  const [accountBalance, setAccountBalance] = useState<BigNumber>();

  const { handleSubmit: handleBuyNow, isLoading } = useBuy(onClose);

  const { handleSubmit: handlePlaceBid, isLoading: isPlaceBidLoading } = useMakeOrder(
    product.id,
    OrderType.BID,
    onClose,
  );

  useEffect(() => {
    const getBalance = async (): Promise<void> => {
      const balance = await getAccountBalance();
      if (balance) setAccountBalance(balance);
    };

    if (accountId) getBalance();
  }, [accountId]);

  if (!accountBalance || !checkoutInformation.amount) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <Loader />
      </div>
    );
  }

  const handleSubmit = () => {
    if (checkoutInformation.type === CheckoutType.BUY_NOW && product.variant?.lowestAsk) {
      return handleBuyNow(product.variant.id, product.variant.lowestAsk.id);
    }

    return handlePlaceBid(checkoutInformation.amount);
  };

  return (
    <>
      <div className="heading">
        <h3>Price Computation</h3>
      </div>
      <div className="heading">
        <p>Account balance</p>
        <div className="subtotal">{accountBalance.valueOf()}</div>
      </div>
      <div className="heading">
        <p>You will pay</p>
        <div className="subtotal">{checkoutInformation.amount}</div>
      </div>
      <button
        type="button"
        className="btn-main lead mb-5"
        disabled={
          !accountBalance
          || accountBalance.lt(checkoutInformation.amount)
          || isLoading
          || isPlaceBidLoading
        }
        onClick={() => handleSubmit()}
      >
        {accountBalance.lt(checkoutInformation.amount) ? 'Insufficient balance' : 'Complete Purchase'}
      </button>
    </>
  );
};

export default Summary;
