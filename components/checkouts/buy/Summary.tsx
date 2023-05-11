import { useContext, useEffect, useState } from 'react';

import BigNumber from 'bignumber.js';

import { useRouter } from 'next/router';
import { OrderType, ProcessType, useMakeOrder } from '../../../hooks';
import WalletContext from '../../../services/WalletService/WalletContext';
import Loader from '../../Loader';
import { CheckoutStepProps } from './Buy';

const Summary: React.FC<CheckoutStepProps> = ({ amount, bidType, product, onClose }) => {
  const router = useRouter();
  const { accountId, getAccountBalance } = useContext(WalletContext);
  const [accountBalance, setAccountBalance] = useState<BigNumber>();

  const onCompleted = (dealId?: number) => {
    if (!dealId) return onClose();

    return router.push(
      `/deals/${dealId}/buyer/pay`,
    );
  };

  console.log('summary');
  const { handleSubmit: handlePlaceBid, isLoading } = useMakeOrder(
    product.id,
    bidType,
    "",
    "",
    OrderType.BID,
    onCompleted,
  );

  useEffect(() => {
    const getBalance = async (): Promise<void> => {
      const balance = await getAccountBalance();
      if (balance) setAccountBalance(balance);
    };

    // if (accountId && !accountBalance) getBalance(); /////////////////////
  }, [accountId]);

  // if (!accountBalance || !amount) {
  //   return (
  //     <div className="d-flex justify-content-center align-items-center">
  //       <Loader />
  //     </div>
  //   );
  // }

  const handleSubmit = () => {
    console.log('handle click')
    handlePlaceBid(amount);
  }

  // const isBalanceInsufficient = accountBalance.lt(amount);
  const isBalanceInsufficient = false;
  return (
    <>
      <div className="heading">
        <h3>Price Computation</h3>
      </div>
      <div className="heading">
        <p>Account balance</p>
        {/* <div className="subtotal">{accountBalance.valueOf()}</div> */}
        <div className="subtotal">{"accountBalance.valueOf()"}</div>
      </div>
      <div className="heading">
        <p>You will pay</p>
        <div className="subtotal">{amount}</div>
      </div>
      <button
        type="button"
        className="btn-main lead mb-5"
        // disabled={!accountBalance || isBalanceInsufficient || isLoading}
        onClick={() => handleSubmit()}
      >
        {isBalanceInsufficient ? 'Insufficient balance' : 'Complete Purchase'}
      </button>
    </>
  );
};

export default Summary;
