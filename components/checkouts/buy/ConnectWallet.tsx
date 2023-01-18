import { useState } from 'react';
import WalletConnector from '../../WalletConnector';
import { Product } from '../checkout.types';
import { CheckoutDetails, CheckoutSteps } from './Buy';

interface Props {
  handleSubmit: (d: CheckoutDetails, nextStep?: CheckoutSteps) => void;
  checkoutDetails: CheckoutDetails;
  product: Product;
}

const ConnectWallet: React.FC<Props> = () => {
  const [showModal, setShowModal] = useState(true);

  return <WalletConnector showModal={showModal} setShowModal={setShowModal} />;
};

export default ConnectWallet;
