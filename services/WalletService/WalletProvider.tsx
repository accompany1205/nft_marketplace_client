import React, {
  useEffect, useMemo,
} from 'react';
import { useDispatch } from 'react-redux';
import { HashConnectConnectionState } from './interfaces';
import useBladeStore from './BladeStore/useBladeStore';
import useHashStore from './HashStore/useHashStore';
import WalletContext, { WalletServiceProviders } from './WalletContext';
import { showToast } from '../../redux/slices/layoutSlice';

const WalletProvider = (props: { children: React.ReactNode }) => {
  const bladeStore = useBladeStore();
  const hashStore = useHashStore({ network: 'testnet', debug: false });
  const dispatch = useDispatch();
  // const [isModalOpen, setIsModalOpen] = useState(false);

  const currentlyConnected = useMemo(() => {
    if (
      bladeStore.hasSession
      && hashStore.status === HashConnectConnectionState.Disconnected
    ) {
      return {
        provider: WalletServiceProviders.BLADE,
        accountId: bladeStore.accountId?.toString(),
        getAccountBalance: bladeStore.getAccountBalance,
        signTransaction: bladeStore.signTransaction,
      };
    }
    if (
      hashStore.status === HashConnectConnectionState.Connected
      && !bladeStore.hasSession
    ) {
      return {
        provider: WalletServiceProviders.HASHPACK,
        accountId: hashStore.accountId,
        getAccountBalance: hashStore.getAccountBalance,
        signTransaction: hashStore.signTransaction,
      };
    }
    if (
      hashStore.status === HashConnectConnectionState.Connected
      && bladeStore.hasSession
    ) {
      dispatch(showToast({
        message: 'You were connected to both wallets. Please reload the page',
        type: 'danger',
      }));
      hashStore.disconnectFromExtension();
      bladeStore.disconnectFromExtension();
      return undefined;
    }
    return undefined;
  }, [bladeStore, hashStore]);

  useEffect(() => {
    if (currentlyConnected?.provider === WalletServiceProviders.BLADE) {
      dispatch(showToast({
        message: 'Successfully connected to Blade wallet',
        type: 'success',
      }));
    } else if (
      currentlyConnected?.provider === WalletServiceProviders.HASHPACK
    ) {
      dispatch(showToast({
        message: 'Successfully connected to Hashpack wallet',
        type: 'success',
      }));
    }
  }, [currentlyConnected?.provider]);

  const connectToExtension = async (
    type: WalletServiceProviders = WalletServiceProviders.BLADE,
  ) => {
    if (currentlyConnected?.provider) {
      dispatch(showToast({
        message: 'You are already connected',
        type: 'danger',
      }));
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
      dispatch(showToast({
        message: 'You are not connected to any extension.',
        type: 'danger',
      }));
      return;
    }
    if (type === WalletServiceProviders.BLADE) {
      await bladeStore.disconnectFromExtension();
    } else if (type === WalletServiceProviders.HASHPACK) {
      await hashStore.disconnectFromExtension();
    }
    dispatch(showToast({
      message: 'Wallet Disconnected',
      type: 'success',
    }));
  };

  const walletValues = useMemo<any>(
    () => ({
      connectWallet: connectToExtension,
      disconnectWallet,
      network: 'testnet',
      accountId: currentlyConnected?.accountId,
      provider: currentlyConnected?.provider,
      getAccountBalance: currentlyConnected?.getAccountBalance,
      signTransaction: currentlyConnected?.signTransaction,
    }),
    [
      connectToExtension,
      currentlyConnected?.accountId,
      currentlyConnected?.provider,
      disconnectWallet,
    ],
  );

  return (
    <WalletContext.Provider value={walletValues}>
      {props.children}
    </WalletContext.Provider>
  );
};

export default WalletProvider;
