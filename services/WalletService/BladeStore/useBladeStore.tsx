import React from "react";
import {
  AccountId,
  Signer,
} from "@hashgraph/sdk";
import { BladeSigner } from "@bladelabs/blade-web3.js";

export interface BladeStoreState {
  signer: Signer | null;
  accountId: AccountId | null;
  hasSession: boolean;
}

const useBladeStore = () => {
  const [state, setState] = React.useState<BladeStoreState>({
    signer: null,
    accountId: null,
    hasSession: false,
  });

  const connectToExtension = async () => {
    if (state.hasSession) {
      console.log("Session was there");
      return;
    } else {
      try {
        const signer = new BladeSigner();
        await signer.createSession()
        signer.onWalletLocked(() => {
          setState({
            signer: null,
            accountId: null,
            hasSession: false,
          });
        });
        const accountId = signer.getAccountId();
        setState({
          signer,
          accountId,
          hasSession: true,
        });
        return true;
      } catch (err: any) {
        alert("Could not connect to the extention");
      }
    }
  };

  const disconnectFromExtension = async () => {
    if (state.signer) {
      (window as any)?.bladeConnect?.killSession();
    }
    setState({
      signer: null,
      accountId: null,
      hasSession: false,
    });
  };

  return {
    accountId: state.accountId,
    hasSession: !!state.signer && !!state.accountId,
    connectToExtension,
    disconnectFromExtension,
  };
};

export default useBladeStore;
