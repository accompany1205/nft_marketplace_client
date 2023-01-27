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

type UseMakeOrder = (
  listing_id: number,
  orderType: OrderType,
  onCompleted?: ((d?: any) => void) | undefined,
) => {
  handleSubmit: (amount: number) => Promise<boolean | void>;
  isLoading: boolean;
};

const useMakeOrder: UseMakeOrder = (listingId, orderType, onCompleted) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [makeBid, { isLoading }] = useMakeBidMutation();

  const [makeAsk, { isLoading: isMakeAskLoading }] = useMakeAskMutation();

  const { user } = store.getState().auth;

  const handleMakeBid = (bid: BidPayload) => {
    if (orderType === OrderType.BID) {
      return makeBid(bid);
    }
    return makeAsk(bid);
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
      listing_id: listingId,
      amount,
      user_id: user.id,
    };

    try {
      const data = await handleMakeBid(formattedBid);

      if (!get(data, 'data.success')) {
        dispatch(
          showToast({
            message: get(data, 'error.data.message')
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

      const dealId = get(data, 'data.data.id');

      if (!dealId && onCompleted) return onCompleted();

      return router.push(
        `/deals/${dealId}/${
          orderType === OrderType.BID ? 'buyer' : 'seller'
        }/pay`,
      );
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
