import React, { useContext, useState } from 'react';

import dynamic from 'next/dynamic';
import { useDispatch } from 'react-redux';

import { Product } from '../../../pages/product';
import { showToast } from '../../../redux/slices/layoutSlice';
import WalletContext from '../../../services/WalletService/WalletContext';
import WalletConnector from '../../WalletConnector';
import { ProcessType } from '../../../hooks';

export enum CheckoutType {
  SELL_NOW = 'Sell Now',
  PLACE_ASK = 'Place Ask',
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
  type: ProcessType,
  onNextStep: (amount: number, balance: number, type: ProcessType) => void;
  onClose: () => void;
  product: Product;
  rate: number;
  royalty: number;
}

const checkoutSteps = {
  [CheckoutSteps.CHECKOUT_DETAILS]: dynamic(() => import('./CheckoutDetails')),
  [CheckoutSteps.SUMMARY]: dynamic(() => import('./Summary')),
};

const Sell: React.FC<Props> = ({ onClose, product, rate }) => {
  const [activeStep, setActiveStep] = useState<CheckoutSteps>(
    CheckoutSteps.CHECKOUT_DETAILS,
  );

  const [showWalletConnectionModal, setShowWalletConnectionModal] = useState<boolean>(false);

  const [amount, setAmount] = useState<number>(
    product.lowestAsk?.amount || 0,
  );
  const [askType, setAskType] = useState<ProcessType>(product.lowestAsk?.amount ? ProcessType.NOW : ProcessType.PROCESSING)
  const [royalty, setRoyalty] = useState<number>(0);

  const { provider } = useContext(WalletContext);

  const dispatch = useDispatch();

  const onNextStep = (amount: number, royalty: number, type: ProcessType) => {
    setAmount(amount);
    setAskType(type);
    console.log("onNextStep: ", amount);

    if(type === ProcessType.NOW){
      setRoyalty(royalty);
    }
    if (!provider) {
      dispatch(
        showToast({
          message: 'Please connect wallet.',
          type: 'danger',
        }),
      );

      return setShowWalletConnectionModal(true);
    }

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
          type = {askType}
          product={product}
          onNextStep={onNextStep}
          onClose={onClose}
          rate={rate}
          royalty={royalty}
        />
        <WalletConnector
          showModal={showWalletConnectionModal}
          setShowModal={setShowWalletConnectionModal}
        />
      </div>
    </div>
  );
};

export default Sell;
