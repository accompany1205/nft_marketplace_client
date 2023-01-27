import React from 'react';
import {
  AccountId,
  Client,
  NftId,
  PrivateKey,
  Signer,
  TokenId,
  TokenNftInfoQuery,
} from '@hashgraph/sdk';
import { BladeSigner } from '@bladelabs/blade-web3.js';
import { useDispatch } from 'react-redux';
import { showToast } from '../../../redux/slices/layoutSlice';

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
  const dispatch = useDispatch();

  const connectToExtension = async () => {
    if (state.hasSession) {
      console.log('Session was there');
    } else {
      try {
        const signer = new BladeSigner();
        await signer.createSession();
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
        dispatch(showToast({
          message: 'Could not connect to the extention',
          type: 'danger',
        }));
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

  const getAccountBalance = async () => {
    if (!state.signer) return alert('Please connect to your wallet');

    const balance = await state.signer?.getAccountBalance();

    return balance.hbars.toBigNumber();
  };
  const hasNft = async (token: string, serial: number) => {
    try {
      const accountId = state?.accountId?.toString();
      const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY || '';

      console.log(accountId, privateKey);

      const client = Client.forTestnet();
      const treasuryId = AccountId.fromString(token);
      const treasuryKey = PrivateKey.fromString(privateKey);
      client.setOperator(treasuryId, treasuryKey);

      console.log('quering TokenNftInfoQuery');

      const info = await new TokenNftInfoQuery()
        .setNftId(new NftId(TokenId.fromString(token), serial))
        .execute(client);
      console.log('info', info);
      return info[0].accountId.toString() === accountId;
    } catch (err) {
      console.log('err', err);
      return false;
    }
  };

  return {
    accountId: state.accountId,
    hasSession: !!state.signer && !!state.accountId,
    connectToExtension,
    disconnectFromExtension,
    getAccountBalance,
    hasNft,
  };
};

export default useBladeStore;
