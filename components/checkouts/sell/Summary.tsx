import { useContext } from 'react';

import { useRouter } from 'next/router';

import { OrderType, useMakeOrder } from '../../../hooks';
import { useGetNftOwnerQuery } from '../../../redux/service/appService';
import WalletContext from '../../../services/WalletService/WalletContext';
import Loader from '../../Loader';
import { CheckoutStepProps } from './Sell';

const Summary: React.FC<CheckoutStepProps> = ({ amount, product, onClose }) => {
  const router = useRouter();

  const { accountId } = useContext(WalletContext);

  const { data: nftOwner } = useGetNftOwnerQuery({
    hederaTokenId: product.hederaTokenId,
    serialNumber: product.serialNumber,
  });

  const onCompleted = (dealId?: number) => {
    if (!dealId) return onClose();

    return router.push(`/deals/${dealId}/seller/pay`);
  };

  const { handleSubmit: handlePlaceAsk, isLoading } = useMakeOrder(
    product.id,
    OrderType.ASK,
    onCompleted,
  );

  if (!amount) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <Loader />
      </div>
    );
  }

  const isNftOwner = accountId?.toString() === nftOwner?.data;

  return (
    <>
      <div className="heading">
        <h3>Price Computation</h3>
      </div>
      <div className="heading">
        <p>Account balance</p>
        <div className="subtotal">{}</div>
      </div>
      <div className="heading">
        <p>You will pay</p>
        <div className="subtotal">{amount}</div>
      </div>
      <button
        type="button"
        className="btn-main lead mb-5"
        disabled={!isNftOwner || isLoading}
        onClick={() => handlePlaceAsk(amount)}
      >
        {isNftOwner ? 'Invalid NFT Ownership' : 'Complete Purchase'}
      </button>
    </>
  );
};

export default Summary;
