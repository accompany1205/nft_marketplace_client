import React, { useContext, useState } from 'react';

import dynamic from 'next/dynamic';
import { useDispatch } from 'react-redux';

import { showToast } from '../../../redux/slices/layoutSlice';
import WalletContext from '../../../services/WalletService/WalletContext';
import { Product } from '../../../pages/product';
import WalletConnector from '../../WalletConnector';
import { ProcessType } from '../../../hooks';

export enum CheckoutType {
  BUY_NOW = 'Buy Now',
  PLACE_BID = 'Place Bid',
}

interface Props {
  onClose: () => void;
  product: Product;
  rate: number;
}

export enum CheckoutSteps {
  CHECKOUT_DETAILS = 'Checkout Details',
  SUMMARY = 'Summary',
}

export interface CheckoutStepProps {
  amount: number;
  bidType: ProcessType;
  onNextStep: (amount: number, balance: number, bidType: ProcessType) => void;
  onClose: () => void;
  product: Product;
  rate: number;
  balance: number;
}

const checkoutSteps = {
  [CheckoutSteps.CHECKOUT_DETAILS]: dynamic(() => import('./CheckoutDetails')),
  [CheckoutSteps.SUMMARY]: dynamic(() => import('./Summary')),
};

const Buy: React.FC<Props> = ({ onClose, product, rate }) => {
  const [activeStep, setActiveStep] = useState<CheckoutSteps>(
    CheckoutSteps.CHECKOUT_DETAILS,
  );

  const [showWalletConnectionModal, setShowWalletConnectionModal] = useState<boolean>(false);

  const [amount, setAmount] = useState<number>(product.lowestAsk?.amount || 0);
  const [bidType, setBidType] = useState<ProcessType>(product.lowestAsk?.amount ? ProcessType.NOW : ProcessType.PROCESSING)

  const { provider } = useContext(WalletContext);
  const [balance, setBalance] = useState<number>(0);

  const dispatch = useDispatch();

  const onNextStep = (amount: number, _balance: number, type: ProcessType) => {
    setAmount(amount);
    setBidType(type);
    if(type === ProcessType.PROCESSING)
      setBalance(_balance);
    if (!provider) {
      dispatch(
        showToast({
          message: 'Please connect wallet.',
          type: 'danger',
        }),
      );

      return setShowWalletConnectionModal(true);
    }
    console.log('onNextStep');
    return setActiveStep(CheckoutSteps.SUMMARY);
  };

  const CurrentStep = checkoutSteps[activeStep];

  return (
    <div className="checkout">
      <div className="maincheckout">
        <button className="btn-close" type="button" onClick={onClose}>
          x
        </button>
        <CurrentStep
          amount={amount}
          bidType={bidType}
          product={product}
          onNextStep={onNextStep}
          balance={balance}
          onClose={onClose}
          rate={rate}
        />
        <WalletConnector
          showModal={showWalletConnectionModal}
          setShowModal={setShowWalletConnectionModal}
        />
      </div>
    </div>
  );
};

export default Buy;
