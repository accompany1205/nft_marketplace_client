import { useContext } from 'react';
import { useDispatch } from 'react-redux';

import { get } from 'lodash';
import { useRouter } from 'next/router';

import {
  useSubmitSellerTransactionMutation,
  useGetSellerTransactionMutation,
} from '../redux/service/appService';
import { showToast } from '../redux/slices/layoutSlice';
import WalletContext from '../services/WalletService/WalletContext';
import { store } from '../redux/store';

const useSellerPayment = (dealId?: number, onCompleted?: () => void) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = store.getState().auth;

  const { accountId, signTransaction } = useContext(WalletContext);

  const [getSellerTransaction, { isLoading }] = useGetSellerTransactionMutation();

  const [
    executeSellerTransaction,
    { isLoading: isExecuteSellerTransactionLoading },
  ] = useSubmitSellerTransactionMutation();

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
      const sellerTransactionResponse = await getSellerTransaction({
        accountId: accountId as string,
        dealId,
        userId: user.id,
      });

      const transactionBuffer = get(sellerTransactionResponse, 'data.data');

      if (!transactionBuffer) {
        return dispatch(
          showToast({
            message:
                get(sellerTransactionResponse, 'error.data.message')
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

      const executeTransactionResponse = await executeSellerTransaction(
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
    isLoading: isLoading || isExecuteSellerTransactionLoading,
    handleSubmit,
  };
};

export default useSellerPayment;
