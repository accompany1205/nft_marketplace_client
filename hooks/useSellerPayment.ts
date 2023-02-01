import { useContext } from 'react';
import { useDispatch } from 'react-redux';

import { get } from 'lodash';
import { useRouter } from 'next/router';

import {
  useGetSellerTransactionMutation,
  useExecuteBuyerTransactionMutation,
} from '../redux/service/appService';
import { showToast } from '../redux/slices/layoutSlice';
import WalletContext from '../services/WalletService/WalletContext';

const useSellerPayment = (dealId?: number, onCompleted?: () => void) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { accountId, signTransaction } = useContext(WalletContext);

  const [getSellerTransaction, { isLoading }] = useGetSellerTransactionMutation();

  const [
    executeBuyerTransaction,
    { isLoading: isExecuteBuyerTransactionLoading },
  ] = useExecuteBuyerTransactionMutation();

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
      });

      console.log("buyerTransactionResponse", buyerTransactionResponse);
      

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

      console.log("transactionBuffer", transactionBuffer);
      

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

      // const executeTransactionResponse = await executeBuyerTransaction(
      //   Buffer.from(signedTransaction).toString('hex'),
      // );

      // if (!get(executeTransactionResponse, 'data.success')) {
      //   return dispatch(
      //     showToast({
      //       message:
      //         get(executeTransactionResponse, 'error.data.message') ||
      //         'There is an error while processing your transaction. Please try again.',
      //       type: 'danger',
      //     }),
      //   );
      // }

      dispatch(
        showToast({
          message: 'Payment successful.',
          type: 'success',
        }),
      );

      if (onCompleted) return onCompleted();
    } catch (error) {
      console.log("error", error);
      
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
    isLoading: isLoading || isExecuteBuyerTransactionLoading,
    handleSubmit,
  };
};

export default useSellerPayment;
