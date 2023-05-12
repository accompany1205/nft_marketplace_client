import { HashConnect, HashConnectTypes, MessageTypes } from 'hashconnect';
import { HashConnectConnectionState } from 'hashconnect/dist/types';
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useDispatch } from 'react-redux';
import { showToast } from '../../../redux/slices/layoutSlice';

import { AccountId, ContractExecuteTransaction, ContractFunctionParameters, Hbar, TransactionReceipt } from '@hashgraph/sdk';
import { makeBytes } from '../../Web3Module/signingService';

export interface PropTypes {
  network: string;
  debug?: boolean;
}

export interface ResponseType {
  response: MessageTypes.TransactionResponse | undefined;
  receipt: any;
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

  const sessionData: SavedPairingData | null = useMemo(
    () => JSON.parse(window?.localStorage?.getItem('hashpack') || 'null'),
    [],
  );

  const initializeHashConnect = useCallback(async () => {
    try {
      const hashConnectInstance = new HashConnect(debug);
      if (!sessionData) {
        const initData = await hashConnectInstance.init(APP_CONFIG, 'testnet');
        if (debug) console.log('initData', initData);

        const privateKey = initData.encryptionKey;
        if (debug) console.log('PRIVATE KEY: ', privateKey);
        const state = await hashConnectInstance.connect();
        if (debug) console.log('STATE: ', state);
        hashConnectInstance.findLocalWallets();

        const { topic } = initData;

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
        await hashConnectInstance.init(
          APP_CONFIG,
          (sessionData.privKey || 'testnet') as TNetwork,
        );

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
      if (debug) { console.info('===============Saving to localstorage::============='); }
      const dataToSave: SavedPairingData = {
        metadata: data.metadata!,
        privKey: data.privKey!,
        pairingData: data.pairingData!,
      };
      if (debug) console.log('DATA TO SAVE: ', data);
      // eslint-disable-next-line no-unused-expressions
      window
        && window.localStorage.setItem('hashpack', JSON.stringify(dataToSave));
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
    [
      debug,
      saveDataInLocalStorage,
      hashState.availableExtension,
      hashState.privKey,
    ],
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

  const dispatch = useDispatch();

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
  }, [
    hashState.hashConnect,
    foundExtensionEventHandler,
    pairingEventHandler,
    acknowledgeEventHandler,
    onStatusChange,
  ]);

  const connectToExtension = async () => {
    if (hashState.state === HashConnectConnectionState.Connected) {
      dispatch(
        showToast({
          message: 'Already connected',
          type: 'danger',
        }),
      );
      return false;
    }
    if (!hashState.availableExtension) {
      dispatch(
        showToast({
          message: 'Could not connect to the Hashpack extension',
          type: 'danger',
        }),
      );
      return false;
    }

    if (!hashState.hashConnect) {
      dispatch(
        showToast({
          message: 'An unexpected error occoured. Please reload',
          type: 'danger',
        }),
      );
      return false;
    }
    hashState.hashConnect.connectToLocalWallet();
    return true;
  };

  const disconnectFromExtension = () => {
    if (window) {
      window.localStorage.removeItem('hashpack');
    }
    setState!((exData) => ({
      ...exData,
      pairingData: null,
      state: HashConnectConnectionState.Disconnected,
    }));
  };

  const getAccountBalance = async () => {
    const accountId = hashState.pairingData?.accountIds[0].toString();

    if (!accountId || !hashState.pairingData?.topic) {
      return dispatch(
        showToast({
          message: 'Please connect to your wallet',
          type: 'danger',
        }),
      );
    }

    const provider = hashState.hashConnect?.getProvider(
      network,
      hashState.pairingData?.topic,
      accountId,
    );

    const balance = await provider?.getAccountBalance(accountId);

    return balance?.hbars.toBigNumber();
  };

  const signTransaction = async (
    transactionBuffer: Uint8Array,
    accountToSign: string,
  ): Promise<string | Uint8Array | undefined> => {
    const transaction: MessageTypes.Transaction = {
      topic: hashState.pairingData?.topic || '',
      byteArray: transactionBuffer,

      metadata: {
        accountToSign,
        returnTransaction: true,
      },
    };

    const signedTransactionDetails = await hashState.hashConnect?.sendTransaction(
      hashState.pairingData?.topic || '',
      transaction,
    );

    return signedTransactionDetails?.signedTransaction;
  };
  const sendTransaction =
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    async (
      trans: Uint8Array,
      acctToSign: string,
      return_trans = false,
      hideNfts = false,
      getRecord = false
    ) => {
      const transaction: MessageTypes.Transaction = {
        topic: hashState.pairingData?.topic || '',
        byteArray: trans,

        metadata: {
          accountToSign: acctToSign,
          returnTransaction: return_trans,
          hideNft: hideNfts,
          getRecord: getRecord
        }
      }

      return await hashState.hashConnect?.sendTransaction(hashState.pairingData?.topic || '', transaction)
    }

  const sellNow = async (contractId: string, buyerWalletId: string, nftTokenId: string): Promise<ResponseType| undefined> => {
    try {
      const signingAcct = hashState.pairingData?.accountIds[0].toString()|| "";
      console.log({signingAcct})
      //this is the example contract from https://hedera.com/blog/how-to-deploy-smart-contracts-on-hedera-part-1-a-simple-getter-and-setter-contract
      const buyerAccountId: string = AccountId.fromString(buyerWalletId || "0.0.4486374").toSolidityAddress();
      const feeRecipientAccountId: string = AccountId.fromString(contractId).toSolidityAddress();
      const NFTId: string = AccountId.fromString(nftTokenId || "0.0.4486241").toSolidityAddress();
      const trans = new ContractExecuteTransaction()
        .setContractId(contractId)
        .setGas(100000)
        // .setPayableAmount(new Hbar(10))
        // .setFunction("setMobileNumber", new ContractFunctionParameters().addString("Bob").addUint256(222222))
        // .setFunction("setFeePercentage", new ContractFunctionParameters().addUint32(10))
        .setFunction("sellNow", new ContractFunctionParameters().addAddress(buyerAccountId).addAddress(feeRecipientAccountId).addUint256(5).addUint256(100000000).addAddress(NFTId).addUint256(1))
        .setMaxTransactionFee(new Hbar(2));

      console.log("----------------- account signingAcct ---------------", signingAcct)
      const transactionBytes: Uint8Array = await makeBytes(trans, signingAcct);
      // let transactionBytes: Uint8Array = await this.SigningService.makeBytes(trans, "0.0.3999717");


      const res = await sendTransaction(transactionBytes, signingAcct, false, false, false);
      // let res = await this.HashconnectService.sendTransaction(transactionBytes, "0.0.3999717", false, false, this.getRecord);

      console.log(res)
      //handle response
      const responseData: ResponseType = {
        response: res,
        receipt: null
      }

      if (res && res.success) responseData.receipt = TransactionReceipt.fromBytes(res.receipt as Uint8Array);

      return responseData
    } catch (e) {
      console.log(e);
    }
  }



  return {
    ...hashState,
    connectToExtension,
    status: hashState.pairingData
      ? HashConnectConnectionState.Connected
      : HashConnectConnectionState.Disconnected,
    disconnectFromExtension,
    accountId: hashState.pairingData?.accountIds[0].toString(),
    getAccountBalance,
    signTransaction,
    sellNow,
    initializeHashConnect,
  };
};

export default useHashStore;
