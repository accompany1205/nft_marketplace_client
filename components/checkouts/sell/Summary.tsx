import { useContext } from 'react';

import { useRouter } from 'next/router';

import { OrderType, useMakeOrder } from '../../../hooks';
import { useGetNftOwnerQuery } from '../../../redux/service/appService';
import WalletContext from '../../../services/WalletService/WalletContext';
import Loader from '../../Loader';
import { CheckoutStepProps } from './Sell';

const Summary: React.FC<CheckoutStepProps> = ({ amount, type, product, onClose }) => {
  const router = useRouter();

  const { accountId } = useContext(WalletContext);

  // const { data: nftOwner, isLoading: loadingNftValidation } = useGetNftOwnerQuery(
  //   {
  //     hederaTokenId: product.hederaTokenId,
  //     serialNumber: product.serialNumber,
  //   },
  //   { skip: !product.hederaTokenId || !product.serialNumber },
  // );
  const loadingNftValidation = false;
  const nftOwner = null;
  const onCompleted = (dealId?: number) => {
    if (!dealId) return onClose();

    return router.push(`/deals/${dealId}/seller/pay`);
  };

  const { handleSubmit: handlePlaceAsk, isLoading } = useMakeOrder(
    product.id,
    type,
    "nft_id",
    "serial_id",
    OrderType.ASK,
    onCompleted,
  );

  if (!amount || loadingNftValidation) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <Loader />
      </div>
    );
  }

  // const isNftOwner = accountId?.toString() === nftOwner?.data;
  const isNftOwner = false;

  return (
    <>
      <div className="heading">
        <h3>Price Computation</h3>
      </div>
      <div className="heading">
        <p>You will get</p>
        <div className="subtotal">{amount}</div>
      </div>
      <button
        type="button"
        className="btn-main lead mb-5"
        // disabled={!isNftOwner || isLoading}
        onClick={() => handlePlaceAsk(amount)}
      >
        {/* {!isNftOwner ? 'Invalid NFT Ownership' : 'Complete Purchase'} */}
        Complete Purchase
      </button>
    </>
  );
};

export default Summary;
