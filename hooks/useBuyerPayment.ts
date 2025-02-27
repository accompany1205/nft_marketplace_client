import { useContext } from 'react';
import { useDispatch } from 'react-redux';

import { get } from 'lodash';
import { useRouter } from 'next/router';

import {
  useGetBuyerTransactionMutation,
  useSubmitBuyerTransactionMutation,
} from '../redux/service/appService';
import { showToast } from '../redux/slices/layoutSlice';
import WalletContext from '../services/WalletService/WalletContext';
import useAuth from './useAuth';

const useBuyerPayment = (dealId?: number, onCompleted?: () => void) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useAuth();

  const { accountId, signTransaction } = useContext(WalletContext);

  const [getBuyerTransaction, { isLoading }] = useGetBuyerTransactionMutation();

  const [
    executeBuyerTransaction,
    { isLoading: isExecuteBuyerTransactionLoading },
  ] = useSubmitBuyerTransactionMutation();

  const handleSubmit = async () => {
    if (!user) {
      dispatch(
        showToast({
          message: 'Please login.',
          type: 'danger',
        }),
      );

      return router.push('/login');
    }

    if (!dealId) {
      dispatch(
        showToast({
          message: 'Deal not found.',
          type: 'danger',
        }),
      );

      return router.push('/');
    }

    if (!accountId) {
      return dispatch(
        showToast({
          message: 'Please Connect your wallet.',
          type: 'danger',
        }),
      );
    }

    try {
      const buyerTransactionResponse = await getBuyerTransaction({
        accountId: accountId as string,
        dealId,
        userId: user.id,
      });

      const transactionBuffer = get(buyerTransactionResponse, 'data.data');

      if (!transactionBuffer) {
        return dispatch(
          showToast({
            message:
                get(buyerTransactionResponse, 'error.data.message')
                || 'There is an error while processing your transaction. Please try again.',
            type: 'danger',
          }),
        );
      }

      const signedTransaction = await signTransaction(
        Buffer.from(transactionBuffer, 'hex'),
        accountId as string,
      );

      if (!signedTransaction) {
        return dispatch(
          showToast({
            message:
                'There is an error in transaction approval. Please try again.',
            type: 'danger',
          }),
        );
      }

      const executeTransactionResponse = await executeBuyerTransaction(
        Buffer.from(signedTransaction).toString('hex'),
      );

      if (!get(executeTransactionResponse, 'data.success')) {
        return dispatch(
          showToast({
            message: get(executeTransactionResponse, 'error.data.message')
              || 'There is an error while processing your transaction. Please try again.',
            type: 'danger',
          }),
        );
      }

      dispatch(
        showToast({
          message: 'Payment successful.',
          type: 'success',
        }),
      );

      if (onCompleted) return onCompleted();
    } catch (error) {
      return dispatch(
        showToast({
          message: 'There is an error while processing your transaction. Please try again.',
          type: 'danger',
        }),
      );
    }
  };

  return {
    isLoading: isLoading || isExecuteBuyerTransactionLoading,
    handleSubmit,
  };
};

export default useBuyerPayment;
