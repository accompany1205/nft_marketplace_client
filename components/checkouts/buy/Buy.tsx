import React, { useContext, useState } from 'react';

import dynamic from 'next/dynamic';
import WalletContext from '../../../services/WalletService/WalletContext';
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

export interface CheckoutInformation {
  type: CheckoutType;
  amount: number;
  askId?: number;
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

  const [showWalletConnectionModal, setShowWalletConnectionModal] = useState<boolean>(false);

  const [checkoutInformation, setCheckoutDetails] = useState<CheckoutInformation>({
    type: product.lowestAsk ? CheckoutType.BUY_NOW : CheckoutType.PLACE_BID,
    amount: product.lowestAsk?.amount || 100,
  });

  const { provider } = useContext(WalletContext);

  const handleShowWalletConnectionModal = (show: boolean): void => {
    if (show && provider) return setActiveStep(CheckoutSteps.SUMMARY);

    if (!show) {
      if (!provider) setActiveStep(CheckoutSteps.CHECKOUT_DETAILS);

      else setActiveStep(CheckoutSteps.SUMMARY);
    }

    return setShowWalletConnectionModal(show);
  };

  const onNextStep = (detail: CheckoutInformation): void => {
    setCheckoutDetails(detail);

    return handleShowWalletConnectionModal(true);
  };

  const CurrentStep = checkoutSteps[activeStep];

  return (
    <div className="checkout">
      <div className="maincheckout">
        <button className="btn-close" type="button" onClick={onClose}>
          x
        </button>
        {CurrentStep && (
          <CurrentStep
            checkoutInformation={checkoutInformation}
            product={product}
            onNextStep={onNextStep}
            onClose={onClose}
          />
        )}
        <WalletConnector
          showModal={showWalletConnectionModal}
          setShowModal={handleShowWalletConnectionModal}
        />
      </div>
    </div>
  );
};

export default Buy;
