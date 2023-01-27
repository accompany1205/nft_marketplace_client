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
  hasNft: (token: string, serial: number) => void;
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
  hasNft: () => {},
});

export default WalletContext;
