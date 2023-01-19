import BigNumber from 'bignumber.js';
import { useContext, useEffect, useState } from 'react';
import { OrderType, useBuy, useMakeOrder } from '../../../hooks';
import WalletContext from '../../../services/WalletService/WalletContext';
import Loader from '../../Loader';
import { CheckoutStepProps } from './Buy';

const Summary: React.FC<CheckoutStepProps> = ({ checkoutDetails, product, onClose }) => {
  const { accountId, getAccountBalance } = useContext(WalletContext);
  const [accountBalance, setAccountBalance] = useState<BigNumber>();

  const { isLoading } = useBuy(onClose);

  const { isLoading: isPlaceBidLoading } = useMakeOrder(
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

  if (!accountBalance || !checkoutDetails.amount) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <Loader />
      </div>
    );
  }

  const handleSubmit = () => {
    // if (checkoutDetails.type === CheckoutType.BUY_NOW && product.variant.lowestAsk.id) {
    //   return handleBuyNow(product.variant.id, product.variant.lowestAsk.id);
    // }
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
        <div className="subtotal">{checkoutDetails.amount}</div>
      </div>
      <button
        type="button"
        className="btn-main lead mb-5"
        disabled={
          !accountBalance
          || accountBalance.lt(checkoutDetails.amount)
          || isLoading
          || isPlaceBidLoading
        }
        onClick={() => handleSubmit()}
      >
        {accountBalance.lt(checkoutDetails.amount) ? 'Insufficient balance' : 'Complete Purchase'}
      </button>
    </>
  );
};

export default Summary;
