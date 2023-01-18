/* eslint-disable @typescript-eslint/no-empty-function */
import { AccountId } from '@hashgraph/sdk';
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
  disconnectWallet: (type: WalletServiceProviders) => Promise<void>;
}

const WalletContext = createContext<WalletContextType>({
  hashStore: null,
  provider: undefined,
  accountId: undefined,
  network: 'testnet',
  connectWallet: async () => { },
  disconnectWallet: async () => { },
});

export default WalletContext;
