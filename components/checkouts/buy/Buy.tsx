import React, { useState } from 'react';

import dynamic from 'next/dynamic';
import WalletConnector from '../../WalletConnector';
import { Product } from '../checkout.types';

export enum CheckoutType {
  BUY_NOW = 'Buy Now',
  PLACE_BID = 'Place Bid',
}

interface Props {
  onClose: () => void;
  product: Product;
}

export interface CheckoutDetails {
  type: CheckoutType;
  amount?: number;
  askId?: number;
  isWalletConnected?: boolean;
}

export enum CheckoutSteps {
  CHECKOUT_DETAILS = 'Checkout Details',
  WALLET_CONNECTION = 'Wallet Connection',
  SUMMARY = 'Summary',
}

const checkoutSteps = {
  [CheckoutSteps.CHECKOUT_DETAILS]: dynamic(() => import('./CheckoutDetails')),
  [CheckoutSteps.SUMMARY]: dynamic(() => import('./Summary')),
};

const Buy: React.FC<Props> = ({ onClose, product }) => {
  const [activeStep, setActiveStep] = useState<CheckoutSteps>(CheckoutSteps.CHECKOUT_DETAILS);
  const [showWalletConnectionModal, setShowWalletConnectionModal] = useState<boolean>(false);
  const [checkoutDetails, setCheckoutDetails] = useState<CheckoutDetails>({
    type: CheckoutType.BUY_NOW,
  });

  const handleSubmit = (detail: CheckoutDetails, nextStep?: CheckoutSteps) => {
    setCheckoutDetails(detail);
    switch (nextStep) {
      case CheckoutSteps.CHECKOUT_DETAILS:
        return setActiveStep(nextStep);
      case CheckoutSteps.WALLET_CONNECTION:
        return setShowWalletConnectionModal(true);
      case CheckoutSteps.SUMMARY:
        return setActiveStep(nextStep);
      default:
        // TODO: create deal or place bid
    }
  };

  const CurrentStep = activeStep === CheckoutSteps.WALLET_CONNECTION
    ? null
    : checkoutSteps[activeStep];

  return (
    <div className="checkout">
      <div className="maincheckout">
        <button className="btn-close" type="button" onClick={onClose}>
          x
        </button>
        {CurrentStep && (
          <CurrentStep
            handleSubmit={handleSubmit}
            checkoutDetails={checkoutDetails}
            product={product}
          />
        )}
        <WalletConnector
          showModal={showWalletConnectionModal}
          setShowModal={setShowWalletConnectionModal}
        />
      </div>
    </div>
  );
};

export default Buy;
