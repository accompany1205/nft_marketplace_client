/* eslint-disable @typescript-eslint/no-empty-function */
import { AccountId } from '@hashgraph/sdk';
import BigNumber from 'bignumber.js';
import { createContext } from 'react';

export enum WalletServiceProviders {
  BLADE = 'blade',
  HASHPACK = 'hashpack',
}

export interface WalletContextType {
  hashStore: any;
  provider?: WalletServiceProviders;
  accountId?: string | null | AccountId;
  network: string;
  connectWallet: (type: WalletServiceProviders) => Promise<void>;
  toggleConnectWalletModal: () => void;
  openConnectWalletModal: () => void;
  closeConnectWalletModal: () => void;
  getAccountBalance: () => Promise<void | BigNumber>;
  disconnectWallet: (type: WalletServiceProviders) => Promise<void>;
  signTransaction: (
    transactionBuffer: Uint8Array,
    accountToSign: string
  ) => Promise<string | Uint8Array | undefined>;
  deposit: (contractId: string, amount: number) => Promise<boolean>;
  sellNow: (contractId: string, buyerWalletId: string, nftTokenId: string) => Promise<boolean>;
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
  connectWallet: async () => {},
  disconnectWallet: async () => {},
  signTransaction: async () => undefined,
  deposit: async () => { return true},
  sellNow: async () => { return true},
});

export default WalletContext;
