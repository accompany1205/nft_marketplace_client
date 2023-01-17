import Image from 'next/image';
import Link from 'next/link';
import React, { useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import WalletContext, { WalletServiceProviders } from '../services/WalletService/WalletContext';

const WalletConnector = ({ setShowModal, showModal }: any) => {
  const { connectWallet } = useContext(WalletContext);
  return (
    <Modal size="lg" show={showModal} onHide={() => setShowModal(false)} centered>
      <Modal.Header>
        <Modal.Title>
          Connect to a wallet
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex p-5 justify-content-between">
          <div>
            <div onClick={() => connectWallet(WalletServiceProviders.HASHPACK)}>
              <Image src="/images/hashpack.jpg" alt="Hash Logo" width={200} height={200} />
              <h5>Hash Wallet</h5>
            </div>
            <Link href="https://www.hashpack.app/download">
              Click here to download the app
            </Link>
          </div>
          <div>
            <div onClick={async () => connectWallet(WalletServiceProviders.BLADE)}>
              <Image src="/images/blade.png" alt="Blade Logo" width={200} height={200} />
              <h5>Blade Wallet</h5>
            </div>
            <Link href="https://www.bladewallet.io/">
              Click here to download the app
            </Link>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default WalletConnector;
