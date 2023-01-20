/* eslint-disable @typescript-eslint/no-empty-function */
import { AccountId, Transaction } from '@hashgraph/sdk';
import BigNumber from 'bignumber.js';
import { MessageTypes } from 'hashconnect';
import { createContext } from 'react';

export enum WalletServiceProviders {
  BLADE = 'blade',
  HASHPACK = 'hashpack',
}

export interface WalletContextType {
  hashStore: any,
  provider?: WalletServiceProviders;
  accountId?: string | null | AccountId;
  network: string;
  connectWallet: (type: WalletServiceProviders) => Promise<void>;
  toggleConnectWalletModal: () => void;
  openConnectWalletModal: () => void;
  closeConnectWalletModal: () => void;
  getAccountBalance: () => Promise<void | BigNumber>;
  disconnectWallet: (type: WalletServiceProviders) => Promise<void>;
  sendTransaction: (
    trans: Uint8Array,
    accountToSign: string,
    returnTransaction?: boolean,
    hideNft?: boolean
  ) => Promise<MessageTypes.TransactionResponse | undefined | void>;
  signTransaction: (
    transaction: Transaction,
    accountId: string
  ) => Promise<Transaction | undefined | void>;
}

const WalletContext = createContext<WalletContextType>({
  hashStore: null,
  provider: undefined,
  accountId: undefined,
  network: 'testnet',
  toggleConnectWalletModal: () => {},
  openConnectWalletModal: () => {},
  closeConnectWalletModal: () => {},
  getAccountBalance: async () => {},
  connectWallet: async () => { },
  disconnectWallet: async () => {},
  sendTransaction: async () => {},
  signTransaction: async () => {},
});

export default WalletContext;
