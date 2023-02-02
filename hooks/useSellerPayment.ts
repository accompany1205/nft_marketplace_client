import { useContext } from 'react';
import { useDispatch } from 'react-redux';

import { get } from 'lodash';
import { useRouter } from 'next/router';

import {
  useGetTransactionMutation,
  useExecuteTransactionMutation,
} from '../redux/service/appService';
import { showToast } from '../redux/slices/layoutSlice';
import WalletContext from '../services/WalletService/WalletContext';
import useAuth from './useAuth';

const useSellerPayment = (dealId?: number, onCompleted?: () => void) => {
  const auth = useAuth();
  const router = useRouter();
  const dispatch = useDispatch();

  const { accountId, signTransaction } = useContext(WalletContext);

  const [getSellerTransaction, { isLoading }] = useGetTransactionMutation();

  const [
    executeSellerTransaction,
    { isLoading: isExecuteSellerTransactionLoading },
  ] = useExecuteTransactionMutation();

  const handleSubmit = async () => {
    try {
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

      const buyerTransactionResponse = await getSellerTransaction({
        accountId: accountId as string,
        dealId,
        userId: auth.user?.id || 0,
      });

      const transactionBuffer = get(buyerTransactionResponse, 'data.data');

      if (!transactionBuffer) {
        return dispatch(
          showToast({
            message:
              get(buyerTransactionResponse, 'error.data.message') ||
              'There is an error while processing your transaction. Please try again.',
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

      const executeTransactionResponse = await executeSellerTransaction(
        Buffer.from(signedTransaction).toString('hex'),
      );

      if (!get(executeTransactionResponse, 'data.success')) {
        return dispatch(
          showToast({
            message:
              get(executeTransactionResponse, 'error.data.message') ||
              'There is an error while processing your transaction. Please try again.',
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
          message:
            'There is an error while processing your transaction. Please try again.',
          type: 'danger',
        }),
      );
    }
  };

  return {
    isLoading: isLoading || isExecuteSellerTransactionLoading,
    handleSubmit,
  };
};

export default useSellerPayment;
