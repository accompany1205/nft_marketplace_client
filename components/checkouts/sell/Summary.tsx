import { useContext } from 'react';

import { useRouter } from 'next/router';

import { OrderType, ProcessType, useMakeOrder } from '../../../hooks';
import { useGetNftOwnerQuery } from '../../../redux/service/appService';
import WalletContext from '../../../services/WalletService/WalletContext';
import Loader from '../../Loader';
import { CheckoutStepProps } from './Sell';
import { decimalUtil } from '../../../utils/hooks/decimalUtils';


const Summary: React.FC<CheckoutStepProps> = ({ amount, type, product, onClose, rate, royalty }) => {
  const router = useRouter();

  const { accountId, sellNow } = useContext(WalletContext);

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

  const handleClickPurchase = async (amout: number) => {
    if (type === ProcessType.NOW) {
      console.log(ProcessType.NOW);
      console.log(product)
      const res = await sellNow(accountId?.toString()||"", product.highestBid?.accountId || "", product.nftTokenId || "")
    } else {
      console.log(ProcessType.PROCESSING);
      handlePlaceAsk(amout);
    }
  }

  if (!amount || loadingNftValidation) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <Loader />
      </div>
    );
  }

  // const isNftOwner = accountId?.toString() === nftOwner?.data;
  const isNftOwner = false;
  if (type === ProcessType.NOW)
    return (
      <>
        <div className="heading">
          <h3>Price Computation</h3>
        </div>
        <div className="heading">
          <p>You will get</p>
          <div className="subtotal">
            {amount}
          </div>
        </div>
        <button
          type="button"
          className="btn-main lead mb-5"
          // disabled={!isNftOwner || isLoading}
          onClick={() => handleClickPurchase(amount)}
        >
          {/* {!isNftOwner ? 'Invalid NFT Ownership' : 'Complete Purchase'} */}
          Complete Purchase
        </button>
      </>
    );
  else
    return (
      <>
        <div className="heading">
          <h3>Price Computation</h3>
        </div>
        <div className="heading">
          <p>You will get</p>
          <div className="subtotal">
            {amount}HBAR ({decimalUtil(4, amount * rate)}$)
          </div>
          <p className='d-flex justify-content-between'>
            <span>Creator Royalties({`${royalty}.0%`})</span>
            <span>-{amount * royalty / 100}HBAR ({decimalUtil(4, amount * rate * royalty / 100)}$)</span>
          </p>
          <p className='d-flex justify-content-between'>
            <span>Platform Fee({`${process.env.NEXT_PUBLIC_PLATFORM_FEE_PERCENTAGE}.0%`})</span>
            <span>-{amount * (Number(process.env.NEXT_PUBLIC_PLATFORM_FEE_PERCENTAGE)) / 100}HBAR ({decimalUtil(4, amount * rate * (Number(process.env.NEXT_PUBLIC_PLATFORM_FEE_PERCENTAGE)) / 100)}$)</span>
          </p>
          <hr />
          <p className="d-flex justify-content-between">
            <span>Total:</span>
            <span className="fw-bolder">{amount * (100 - royalty - Number(process.env.NEXT_PUBLIC_PLATFORM_FEE_PERCENTAGE)) / 100}HBAR ({decimalUtil(4, amount * rate * (100 - royalty - Number(process.env.NEXT_PUBLIC_PLATFORM_FEE_PERCENTAGE)) / 100)}$)</span>
          </p>
        </div>
        <button
          type="button"
          className="btn-main lead mb-5"
          // disabled={!isNftOwner || isLoading}
          onClick={() => handleClickPurchase(amount)}
        >
          {/* {!isNftOwner ? 'Invalid NFT Ownership' : 'Complete Purchase'} */}
          Complete Purchase
        </button>
      </>
    );
};

export default Summary;
