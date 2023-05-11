import { get } from 'lodash';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import {
  useMakeAskMutation,
  useMakeBidMutation,
} from '../redux/service/appService';
import { showToast } from '../redux/slices/layoutSlice';
import { store } from '../redux/store';
import { BidPayload } from '../types';

export enum OrderType {
  BID = 'Bid',
  ASK = 'Ask',
}

export enum ProcessType {
  PROCESSING = 'processing',
  NOW = 'now',
}

type UseMakeOrder = (
  pool_id: number,
  processType: ProcessType,
  nft_id: string,
  serial_id: string,
  orderType: OrderType,
  onCompleted?: ((dealId?: number) => void) | undefined,
) => {
  handleSubmit: (amount: number) => Promise<boolean | void>;
  isLoading: boolean;
};

const useMakeOrder: UseMakeOrder = (pool_id, processType, nft_id, serial_id, orderType, onCompleted) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [makeBid, { isLoading }] = useMakeBidMutation();

  const [makeAsk, { isLoading: isMakeAskLoading }] = useMakeAskMutation();

  const { user } = store.getState().auth;

  const handleMakeBid = (bid: BidPayload, nft_id: string, serial_id: string): any => {
    if (orderType === OrderType.BID) {
      return makeBid(bid);
    }
    console.log('handlemakeBid: ask', bid);
    return makeAsk({
      ...bid,
      nft_id,
      serial_id
    });
  };

  const handleSubmit = async (amount: number) => {
    if (!user) {
      dispatch(
        showToast({
          message: 'Please login to continue.',
          type: 'danger',
        }),
      );

      return router.push('/login');
    }

    const formattedBid: BidPayload = {
      pool_id: pool_id,
      processing_type: processType,
      amount,
      user_id: user.id,
    };

    try {
      console.log("useMakeOrder");
      const data = await handleMakeBid(formattedBid, nft_id, serial_id);

      if (!get(data, 'data.success')) {
        dispatch(
          showToast({
            message:
              get(data, 'error.data.message')
              || `There is an error while placing ${orderType}. Please try again.`,
            type: 'danger',
          }),
        );

        return;
      }

      dispatch(
        showToast({
          message: `Placed ${orderType} successfully.`,
          type: 'success',
        }),
      );

      if (onCompleted) return onCompleted(get(data, 'data.data.id'));
    } catch (err) {
      dispatch(
        showToast({
          message: `There is an error while placing ${orderType}. Please try again.`,
          type: 'danger',
        }),
      );
    }
  };

  return {
    handleSubmit,
    isLoading: isLoading || isMakeAskLoading,
  };
};

export default useMakeOrder;
