import React, {
  useEffect, useMemo,
} from 'react';
import { HashConnectConnectionState } from './interfaces';
import useBladeStore from './BladeStore/useBladeStore';
import useHashStore from './HashStore/useHashStore';
import WalletContext, { WalletServiceProviders } from './WalletContext';

const WalletProvider = (props: { children: React.ReactNode }) => {
  const bladeStore = useBladeStore();
  const hashStore = useHashStore({ network: 'testnet', debug: false });
  // const [isModalOpen, setIsModalOpen] = useState(false);

  const currentlyConnected = useMemo(() => {
    if (
      bladeStore.hasSession
      && hashStore.status === HashConnectConnectionState.Disconnected
    ) {
      return {
        provider: WalletServiceProviders.BLADE,
        accountId: bladeStore.accountId?.toString(),
      };
    } if (
      hashStore.status === HashConnectConnectionState.Connected
      && !bladeStore.hasSession
    ) {
      return {
        provider: WalletServiceProviders.HASHPACK,
        accountId: hashStore.accountId,
      };
    } if (
      hashStore.status === HashConnectConnectionState.Connected
      && bladeStore.hasSession
    ) {
      alert('You were connected to both wallets. Please reload the page');
      hashStore.disconnectFromExtension();
      bladeStore.disconnectFromExtension();
      return undefined;
    }
    return undefined;

    // return undefined;
  }, [bladeStore, hashStore]);

  useEffect(() => {
    if (currentlyConnected?.provider === WalletServiceProviders.BLADE) {
      alert('Successfully connected to blade wallet');
    } else if (
      currentlyConnected?.provider === WalletServiceProviders.HASHPACK
    ) {
      alert('Successfully connected to hash pack wallet');
    }
  }, [currentlyConnected?.provider]);

  const connectToExtension = async (
    type: WalletServiceProviders = WalletServiceProviders.BLADE,
  ) => {
    if (currentlyConnected?.provider) {
      alert('You are already connected');
      return;
    }

    if (type === WalletServiceProviders.BLADE) {
      await bladeStore.connectToExtension();
    } else if (type === WalletServiceProviders.HASHPACK) {
      await hashStore.connectToExtension();
    }
  };

  const disconnectWallet = async (
    type: WalletServiceProviders = WalletServiceProviders.BLADE,
  ) => {
    if (!currentlyConnected?.provider) {
      alert('You are not connected to any extension.');
      return;
    }
    if (type === WalletServiceProviders.BLADE) {
      await bladeStore.disconnectFromExtension();
    } else if (type === WalletServiceProviders.HASHPACK) {
      hashStore.disconnectFromExtension();
    }
  };

  // const toggleConnectWalletModal = useCallback(() => setIsModalOpen((old) => !old), []);
  // const closeConnectWalletModal = useCallback(() => setIsModalOpen(false), []);
  // const openConnectWalletModal = useCallback(() => setIsModalOpen(true), []);

  const walletValues = useMemo<any>(() => ({
    connectWallet: connectToExtension,
    disconnectWallet,
    network: 'testnet',
    accountId: currentlyConnected?.accountId,
    provider: currentlyConnected?.provider,
    // toggleConnectWalletModal,
    // openConnectWalletModal,
    // closeConnectWalletModal,
  }), [connectToExtension, currentlyConnected?.accountId, currentlyConnected?.provider,
    disconnectWallet,
  ]);

  return (
    <WalletContext.Provider
      value={walletValues}
    >
      {props.children}
    </WalletContext.Provider>
  );
};

export default WalletProvider;
