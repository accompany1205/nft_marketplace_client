import React, { useContext, useState } from 'react';

import dynamic from 'next/dynamic';
import { useDispatch } from 'react-redux';

import { showToast } from '../../../redux/slices/layoutSlice';
import WalletContext from '../../../services/WalletService/WalletContext';
import { Product } from '../checkout.types';

export enum CheckoutType {
  BUY_NOW = 'Buy Now',
  PLACE_BID = 'Place Bid',
}

interface Props {
  onClose: () => void;
  product: Product;
}

export interface CheckoutInformation {
  type: CheckoutType;
  amount: number;
}

export enum CheckoutSteps {
  CHECKOUT_DETAILS = 'Checkout Details',
  SUMMARY = 'Summary',
}

export interface CheckoutStepProps {
  checkoutInformation: CheckoutInformation;
  onNextStep: (d: CheckoutInformation) => void;
  onClose: () => void;
  product: Product;
}

const checkoutSteps = {
  [CheckoutSteps.CHECKOUT_DETAILS]: dynamic(() => import('./CheckoutDetails')),
  [CheckoutSteps.SUMMARY]: dynamic(() => import('./Summary')),
};

const Buy: React.FC<Props> = ({ onClose, product }) => {
  const [activeStep, setActiveStep] = useState<CheckoutSteps>(
    CheckoutSteps.CHECKOUT_DETAILS,
  );

  const [checkoutInformation, setCheckoutInformation] = useState<CheckoutInformation>({
    type: product.lowestAsk?.id ? CheckoutType.BUY_NOW : CheckoutType.PLACE_BID,
    amount: product.lowestAsk?.amount || 100,
  });

  const { provider } = useContext(WalletContext);

  const dispatch = useDispatch();

  const onNextStep = (detail: CheckoutInformation) => {
    if (!provider) {
      return dispatch(
        showToast({
          message: 'Please connect wallet.',
          type: 'danger',
        }),
      );
    }

    setCheckoutInformation(detail);

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
          checkoutInformation={checkoutInformation}
          product={product}
          onNextStep={onNextStep}
          onClose={onClose}
        />
      </div>
    </div>
  );
};

export default Buy;
