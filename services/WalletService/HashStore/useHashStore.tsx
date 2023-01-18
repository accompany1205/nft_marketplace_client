import { HashConnect, HashConnectTypes, MessageTypes } from 'hashconnect';
import { HashConnectConnectionState } from 'hashconnect/dist/types';
import {
  useCallback, useEffect, useMemo, useState,
} from 'react';

export interface PropTypes {
  network: string;
  debug?: boolean;
}

export interface SavedPairingData {
  metadata: HashConnectTypes.AppMetadata | HashConnectTypes.WalletMetadata;
  pairingData: MessageTypes.ApprovePairing;
  privKey?: string;
}

export interface HashconnectContextAPI {
  hashConnect: HashConnect | null;
  availableExtension: HashConnectTypes.WalletMetadata;
  state: HashConnectConnectionState;
  topic: string;
  privKey?: string;
  pairingString: string;
  pairingData: MessageTypes.ApprovePairing | null;
  acknowledgeData: MessageTypes.Acknowledge;
}

type TNetwork = 'testnet' | 'mainnet' | 'previewnet';

const APP_CONFIG: HashConnectTypes.AppMetadata = {
  name: 'dApp Example',
  description: 'An example hedera dApp',
  icon: 'https://absolute.url/to/icon.png',
};

const useHashStore = ({ network, debug = false }: PropTypes) => {
  const [hashState, setState] = useState<Partial<HashconnectContextAPI>>({
    hashConnect: null,
    availableExtension: undefined,
    state: HashConnectConnectionState.Disconnected,
    topic: '',
    privKey: undefined,
    pairingString: '',
    pairingData: null,
    acknowledgeData: undefined,
  });

  const sessionData: SavedPairingData | null = useMemo(() => JSON.parse(
    window?.localStorage?.getItem('hashpack') || 'null',
  ), []);

  const initializeHashConnect = useCallback(async () => {
    try {
      const hashConnectInstance = new HashConnect(debug);
      if (!sessionData) {
        // first init and store the private key for later
        const initData = await hashConnectInstance.init(APP_CONFIG, 'testnet');
        if (debug) console.log('initData', initData);

        const privateKey = initData.encryptionKey;
        if (debug) console.log('PRIVATE KEY: ', privateKey);

        // then connect, storing the new topic for later
        const state = await hashConnectInstance.connect();
        if (debug) console.log('STATE: ', state);
        hashConnectInstance.findLocalWallets();

        // const topic = state.topic;
        const { topic } = initData;

        // generate a pairing string, which you can display and generate a QR code from
        const pairingString = hashConnectInstance.generatePairingString(
          state,
          network,
          debug ?? false,
        );
        setState((exState) => ({
          ...exState,
          topic,
          privKey: privateKey,
          pairingString,
          state: HashConnectConnectionState.Disconnected,
          hashConnect: hashConnectInstance,
        }));
      } else {
        await hashConnectInstance.init(APP_CONFIG, (sessionData.privKey || 'testnet') as TNetwork);

        const state = await hashConnectInstance.connect(
          sessionData?.pairingData.topic,
          sessionData?.pairingData.metadata,
        );

        hashConnectInstance.findLocalWallets();

        const pairingString = hashConnectInstance.generatePairingString(
          state,
          network,
          debug,
        );

        setState((exState) => ({
          ...exState,
          pairingString,
          availableExtension: sessionData?.metadata,
          pairingData: sessionData?.pairingData,
          state: HashConnectConnectionState.Connected,
          hashConnect: hashConnectInstance,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  }, [debug, network, sessionData]);

  const foundExtensionEventHandler = useCallback(
    (data: HashConnectTypes.WalletMetadata) => {
      if (debug) console.log('====foundExtensionEvent====', data);
      setState((exState) => ({ ...exState, availableExtension: data }));
    },
    [debug],
  );

  const saveDataInLocalStorage = useCallback(
    (data: SavedPairingData) => {
      if (debug) console.info('===============Saving to localstorage::=============');
      const dataToSave: SavedPairingData = {
        metadata: data.metadata!,
        privKey: data.privKey!,
        pairingData: data.pairingData!,
      };
      if (debug) console.log('DATA TO SAVE: ', data);
      window && window.localStorage.setItem('hashpack', JSON.stringify(dataToSave));
    },
    [debug],
  );

  const pairingEventHandler = useCallback(
    (data: MessageTypes.ApprovePairing) => {
      if (debug) console.log('===Wallet connected=====', data);
      setState((exState) => ({ ...exState, pairingData: data }));
      saveDataInLocalStorage({
        metadata: hashState.availableExtension!,
        pairingData: data,
        privKey: hashState.privKey!,
      });
    },
    [debug, saveDataInLocalStorage, hashState.availableExtension, hashState.privKey],
  );

  const acknowledgeEventHandler = useCallback(
    (data: MessageTypes.Acknowledge) => {
      if (debug) console.log('====::acknowledgeData::====', data);
      setState((iniData) => ({ ...iniData, acknowledgeData: data }));
    },
    [debug],
  );

  const onStatusChange = useCallback(
    (state: HashConnectConnectionState) => {
      if (debug) console.log('hashconnect state change event', state);
      setState((exState) => ({ ...exState, state }));
    },
    [debug],
  );
  useEffect(() => {
    initializeHashConnect();
  }, [initializeHashConnect]);

  useEffect(() => {
    if (!hashState.hashConnect) return;
    hashState.hashConnect.foundExtensionEvent.on(foundExtensionEventHandler);
    hashState.hashConnect.pairingEvent.on(pairingEventHandler);
    hashState.hashConnect.acknowledgeMessageEvent.on(acknowledgeEventHandler);
    hashState.hashConnect.connectionStatusChangeEvent.on(onStatusChange);
    return () => {
      if (!hashState.hashConnect) return;
      hashState.hashConnect.foundExtensionEvent.off(foundExtensionEventHandler);
      hashState.hashConnect.pairingEvent.off(pairingEventHandler);
      hashState.hashConnect.acknowledgeMessageEvent.off(
        acknowledgeEventHandler,
      );
      hashState.hashConnect.connectionStatusChangeEvent.off(onStatusChange);
    };
  }, [hashState.hashConnect, foundExtensionEventHandler, pairingEventHandler, acknowledgeEventHandler, onStatusChange]);

  const connectToExtension = async () => {
    if (hashState.state === HashConnectConnectionState.Connected) {
      alert('Already connected');
      return false;
    }
    if (!hashState.availableExtension) {
      alert('Could not connect to the Hashpack extension');
      return false;
    }

    if (!hashState.hashConnect) {
      alert('An unexpected error occoured. Please reload');
      return false;
    }
    hashState.hashConnect.connectToLocalWallet();
    return true;
  };

  const disconnectFromExtension = () => {
    window && window.localStorage.removeItem('hashpack');
    setState!((exData) => ({
      ...exData,
      pairingData: null,
      state: HashConnectConnectionState.Disconnected,
    }));
  };

  return {
    ...hashState,
    connectToExtension,
    status: hashState.pairingData
      ? HashConnectConnectionState.Connected
      : HashConnectConnectionState.Disconnected,
    disconnectFromExtension,
    accountId: hashState.pairingData?.accountIds[0].toString(),
  };
};

export default useHashStore;
