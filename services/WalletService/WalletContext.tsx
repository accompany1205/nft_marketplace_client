'use client';

import { AccountId } from '@hashgraph/sdk';
import { createContext } from 'react';

// create a provider enum: blade || hashpack
export enum WalletServiceProviders {
  BLADE = 'blade',
  HASHPACK = 'hashpack',
}

export interface WalletContextType {
  provider?: WalletServiceProviders;
  accountId?: string | null | AccountId;
  network: string;
  connectWallet: (type: WalletServiceProviders) => Promise<void>;
  disconnectWallet: () => Promise<void>;
  toggleConnectWalletModal: () => void;
  openConnectWalletModal: () => void;
  closeConnectWalletModal: () => void;
}

const WalletContext = createContext<WalletContextType>({
  provider: undefined,
  accountId: undefined,
  network: 'testnet',
  connectWallet: async () => {
    console.log('test connectWallet ');
  },
  disconnectWallet: async () => {},
  toggleConnectWalletModal: () => {},
  openConnectWalletModal: () => {},
  closeConnectWalletModal: () => {},
});

export default WalletContext;
